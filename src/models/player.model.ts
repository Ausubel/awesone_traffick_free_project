
import StoredProcedures from "../db/StoredProcedures";
import Player from "../entities/Player";
import ModelBase from "./ModelBase";
import playerReducedMapper from "./mappers/playerReduced.mapper";


export default class PlayerModel  extends ModelBase{
	async getPlayers(): Promise<Player[]> {
		const [[resultset]] = (await this.database.query(
			StoredProcedures.GetAllPlayers
		)) as [[any[]]];
		return resultset.map(playerReducedMapper);
	}
}
