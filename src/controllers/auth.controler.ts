import { Router } from "express";
import ControllerBase from "./ControllerBase";
import ApiResponse from "../utils/http";
import AuthService from  "../services/auth.service";
import Encrypter from "../utils/encripter";
import UserDTO from "./dtos/UserDTO"
import { checkAuthToken } from "../utils/checkAuthToken";
import { USER_ROLE_IDS } from "../config/constants";
import Tokenizer from "../utils/tokenizer";


export default class AuthController implements ControllerBase {
	private _root: string;
	private _router: Router;
	private authService: AuthService;
	constructor() {
		this._root = "/auth";
		this._router = Router();
		this.authService = new AuthService();
		this.onEndpoints();
	}
	get root() {
		return this._root;
	}
	get router() {
		return this._router;
	}
	private onEndpoints() {
        this.onSignIn()
        this.onRegisterUserGuest()
	}
    private onSignIn(){
        this.router.get("/sing-in", async (req, res) => {
            const username: string = req.body.username as string;
            const password: string = req.body.password as string;
            const partialUser = await this.authService.getPasswordByUserName(username);
            if (!partialUser.password){
                res.status(400).json(ApiResponse.empty());
                console.log(partialUser);
                return;
            }
            const isCorrect = await Encrypter.compare(password, partialUser.password);
            if (!isCorrect){
                res.status(400).json(ApiResponse.empty());
                return;
            }
            const user = await this.authService.getUserDataById(partialUser.id);
            console.log(user[0].roleId)
            const token = await Tokenizer.create({
                userRoleId: user[0]["roleId"]
            });
            console.log(user[0].roleId)
            res.json(ApiResponse.complete("SUCCESS", {
                user,
                token
            }));
        })
    }
    private onRegisterUserGuest() {
        this.router.post("/register-guest", checkAuthToken(USER_ROLE_IDS.ADMIN), async (req, res) => {
            const guest = {
                ...req.body,
                password: await Encrypter.encrypt(req.body.password)
            };
    
            if (!UserDTO.isValid(guest)) {
                return res.status(400).json(ApiResponse.empty());
            }
    
            const user: UserDTO = new UserDTO(guest);
            const message: string = await this.authService.registerUserGuest(user);
    
            if (message !== "SUCCESS") {
                return res.status(400).json(ApiResponse.error(message));
            }
    
            return res.json(ApiResponse.complete<null>(message, null));
        });
    }    
}

