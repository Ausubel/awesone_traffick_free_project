
import StoredProcedures from "../db/StoredProcedures";
import Player, { ExtendedPlayer } from "../entities/Player";
import ModelBase from "./ModelBase";
import playerReducedMapper from "./mappers/playerReduced.mapper";
import extendedPlayerMapper from "./mappers/extended.Player.mapper";
import PlayerRegisterDTO from "../controllers/dtos/PlayerRegisterDTO";


export default class PlayerModel  extends ModelBase{
	async getPlayers(): Promise<Player[]> {
		const [[resultset]] = (await this.database.query(
			StoredProcedures.GetAllPlayers
		)) as [[any[]]];
		return resultset.map(playerReducedMapper);
	}
	async getPlayerByNameId(name: string): Promise<ExtendedPlayer[]> {
		const [[resultset]] = (await this.database.query(
			StoredProcedures.GetPlayerByNameId,
			[name]
		)) as [[any[]]];
		return resultset.map(extendedPlayerMapper);
	}
	async getPlayersByTeamName(teamName: string): Promise<Player[]> {
		const [[resultset]] = (await this.database.query(
			StoredProcedures.GetPlayerByTeamName,
			[teamName]
		)) as [[any[]]];
		return resultset.map(playerReducedMapper);
	}
	async registerPlayer(player: PlayerRegisterDTO): Promise<any> {
		const [[[record]]] = await this.database.query(
			StoredProcedures.RegisterPlayer,
			[
				player.firstName,
				player.lastName,
				player.dateOfBirth,
				player.marketValue,
				player.countryId
			]
		);
		return record;
	}
}
