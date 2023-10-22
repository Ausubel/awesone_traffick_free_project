import Backend from "../Backend";
import Player from "../entities/Player";

export default class PlayerModel {
	async getPlayers(): Promise<Player[]> {
		const [resultset] = await Backend.database.query(
		  	"SELECT * FROM player;"
		);
		return resultset.map((record: any) => {
			return {
				id: record.id,
				first_name: record.first_name,
				last_name: record.last_name,
				date_of_birth: record.date_of_birth,
				market_value: record.market_value,
				current_contract_id: record.current_contract_id,
				current_agent_id: record.current_agent_id,
				career_statistics_id: record.career_statistics_id,
				country_id: record.country_id,
			};
		});
	}
	findPlayer(PlayerId: number): any {
		// const foundPlayer = db
		// 	.getPlayers()
		// 	.find(({ id }) => id === PlayerId);
		// return foundPlayer;
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
