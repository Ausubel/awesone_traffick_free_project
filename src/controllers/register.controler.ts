import { Router } from "express";
import ControllerBase from "../controllers/ControllerBase";
import RegisterService from "../services/register.service";
import { checkAuthToken } from "../utils/checkAuthToken";
import Encrypter from "../utils/encripter";
import UserDTO from "./dtos/UserDTO";
import ApiResponse from "../utils/http";
import { USER_ROLE_IDS } from "../config/constants";
import { sendResponses } from "../utils/sendResponses";

export default class RegisterController implements ControllerBase {
    private _root: string;
    private _router: Router;
    private registerService: RegisterService;
    constructor(){
        this._root = "/register";
        this._router = Router();
        this.registerService = new RegisterService();
        this.onEndpoints();
    }
    get root(){
        return this._root;
    }
    get router(){
        return this._router;
    }
    private onEndpoints(){
        this.onRegisterUserGuest()
        this.onRegisterUserAgent()
    }
    private onRegisterUserGuest() {
        this.router.post("/guest", checkAuthToken(USER_ROLE_IDS.ADMIN), async (req, res) => {
            const guest = {
                ...req.body,
                password: await Encrypter.encrypt(req.body.password)
            };
    
            if (!UserDTO.isValid(guest)) {
                return sendResponses(res, 422, "Invalid body");
            }
    
            const user: UserDTO = new UserDTO(guest);
            const message: string = await this.registerService.registerUserGuest(user);
    
            if (message !== "SUCCESS") {
                return sendResponses(res, 409, message);
            }
    
            return sendResponses(res, 201);
        });
    }
    
    private onRegisterUserAgent() {
        this.router.post("/agent", checkAuthToken(USER_ROLE_IDS.ADMIN), async (req, res) => {
            const agent = {
                ...req.body,
                passsword: await Encrypter.encrypt(req.body.password)
            }
            if (!UserDTO.isValid(agent)) {
                return sendResponses(res, 422, "Invalid body");
            }
            const user: UserDTO = new UserDTO(agent);
            const message: string = await this.registerService.registerUserAgent(user);
            if (message !== "SUCCESS") {
                return sendResponses(res, 409, message);
            }
            return sendResponses(res, 201);
        })
    }
}