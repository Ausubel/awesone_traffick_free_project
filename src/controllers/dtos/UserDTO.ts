import { isString } from "../../utils/validators";

export default class UserDTO{
    readonly name: string;
    readonly lastName: string;
    readonly userName: string;
    readonly password: string;
    constructor({ name, lastName, userName, password}: any){
        this.name = name;
        this.lastName = lastName;
        this.userName = userName;
        this.password = password;
    }
    static isValid(body: any){
        return (
            isString(body.name) &&
            isString(body.lastName) &&
            isString(body.userName) &&
            isString(body.password)
        );
    }
}