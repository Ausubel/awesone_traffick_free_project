import UserDTO from "../controllers/dtos/UserDTO";
import User from "../entities/User";
import AuthModel from "../models/auth.model";
import Tokenizer from "../utils/tokenizer";


export default class AuthService{
    private authModel: AuthModel;
    constructor(){
        this.authModel = new AuthModel();
    }
    async getPasswordByUserName(username: string): Promise<any>{   
        return await this.authModel.getPasswordByUserName(username);
    }
    async getUserDataById(id: number): Promise<User>{
        return await this.authModel.getUserDataById(id);
    }
    async registerUserGuest(user: UserDTO): Promise<any>{
        const record = await this.authModel.registerUserGuest(user);
        const message = record["message"] as string;
        return message;
    }
}