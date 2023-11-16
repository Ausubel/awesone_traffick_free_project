import StoredProcedures from "../db/StoredProcedures";
import ModelBase from "./ModelBase";
import userMapper from "./mappers/user.mapper";

export default class AuthModel extends ModelBase {
  async getPasswordByUserName(username: string): Promise<string> {
    const [[resultset]] = (await this.database.query(
      StoredProcedures.GetPasswordByUserName,
      [username]
    )) as [[any[]]];
    return resultset[0];
  }
  async getUserDataById(id: number): Promise<any> {
    const [[resultset]] = (await this.database.query(
      StoredProcedures.GetUserDataById,
      [id]
    )) as [[any[]]];
    return resultset.map(userMapper);
  }

}
