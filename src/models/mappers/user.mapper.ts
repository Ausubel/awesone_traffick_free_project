import User from "../../entities/User";


export default function userMapper(record: any): User {
    return {
        id: record["id"],
        name: record["name"],
        lastName: record["last_name"],
        userName: record["username"],
        password: record["password"],
        roleId: record["role_id"],
    }
}