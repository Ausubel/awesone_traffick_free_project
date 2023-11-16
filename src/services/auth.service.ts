
import User from "../entities/User";
import AuthModel from "../models/auth.model";



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

}