import UserDTO from "../controllers/dtos/UserDTO";
import StoredProcedures from "../db/StoredProcedures";
import ModelBase from "./ModelBase";

export default class RegisterModel extends ModelBase {
  async registerUserGuest(user: UserDTO): Promise<any> {
    const [[[resultset]]] = await this.database.query(
      StoredProcedures.RegisterUserGuest,
      [user.name, user.lastName, user.userName, user.password]
    );
    return resultset;
  }
  async registerUserAgent(user: UserDTO): Promise<any> {
    const [[[resultset]]] = await this.database.query(
      StoredProcedures.RegisterUserAgent,
      [user.name, user.lastName, user.userName, user.password]
    );
    return resultset;
  }
}