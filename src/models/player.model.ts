
import StoredProcedures from "../db/StoredProcedures";
import Player from "../entities/Player";
import ModelBase from "./ModelBase";
import playerMapper from "./mappers/player.mapper";


export default class PlayerModel  extends ModelBase{
	async getPlayers(): Promise<Player[]> {
		const [[resultset]] = (await this.database.query(
			StoredProcedures.GetAllPlayers
		)) as [[any[]]];
		return resultset.map(playerMapper);
	}
	async findPlayerById(playerId: number): Promise<any> {
		const [[resultset]] = (await this.database.query(
			StoredProcedures.FindPlayerById
			[playerId]
		)) as [[any[]]];
		return resultset.map(playerMapper);
	}
	addPlayer(Player: Player): any {
		// const Players = db.getPlayers();
		// const newPlayer = {
		// 	...Player,
		// 	id: Players.length + 1,
		// };
		// db.setPlayers([...Players, newPlayer]);
		// return newPlayer;
	}
	editPlayer(Player: Player) {
		// const foundPlayer = db
		// 	.getPlayers()
		// 	.find(({ id }) => id === Player.id);
		// Object.assign(foundPlayer, Player);
	}
	removePlayer(PlayerId: number) {
		// const filteredPlayers = db
		// 	.getPlayers()
		// 	.filter(({ id }) => id !== PlayerId);
		// db.setPlayers(filteredPlayers);
	}
}
