import { Router, json } from "express";
import ControllerBase from "./ControllerBase";
import ApiResponse from "../utils/http";
import AuthService from  "../services/auth.service";
import Encrypter from "../utils/encripter";
import UserDTO from "./dtos/UserDTO"
import { checkAuthToken } from "../utils/checkAuthToken";
import { USER_ROLE_IDS } from "../config/constants";
import Tokenizer from "../utils/tokenizer";
import { sendResponses } from "../utils/sendResponses";


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
	}
    private onSignIn(){
        this.router.get("/sing-in", async (req, res) => {
            const username: string = req.body.username as string;
            const password: string = req.body.password as string;
            const partialUser = await this.authService.getPasswordByUserName(username);
            if (!partialUser.password){
                sendResponses(res, 400, "User not found");
                return;
            }
            const isCorrect = await Encrypter.compare(password, partialUser.password);
            if (!isCorrect){
                sendResponses(res, 400, "Wrong password");
                return;
            }
            const user = await this.authService.getUserDataById(partialUser.id);
            console.log(user[0].roleId)
            const token = await Tokenizer.create({
                userRoleId: user[0]["roleId"]
            });
            const data = {
                user,
                token
            }
            sendResponses(res, 200, "Success", data);
        })
    }
}

