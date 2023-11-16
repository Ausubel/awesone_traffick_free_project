import UserDTO from "../controllers/dtos/UserDTO";
import RegisterModel from "../models/register.model";

export default class RegisterService{
  private registerModel: RegisterModel;
  constructor(){
    this.registerModel = new RegisterModel();
  }
  async registerUserGuest(user: UserDTO): Promise<any>{
    const record = await this.registerModel.registerUserGuest(user);
    const message = record["message"] as string;
    return message;
  }
  async registerUserAgent(user: UserDTO): Promise<any>{
    const record = await this.registerModel.registerUserAgent(user);
    const message = record["message"] as string;
    return message;
  }
}