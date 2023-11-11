import PlayerRegisterDTO from "../controllers/dtos/PlayerRegisterDTO";
import PlayerUpdateCarreerStatistiscDTO from "../controllers/dtos/PlayerUpdateCarreerStatistiscDTO";
import Player from "../entities/Player";
import PlayerModel from "../models/player.model";

export default class PlayerService {
	private playerModel: PlayerModel;
	constructor() {
		this.playerModel = new PlayerModel();
	}
	async getPlayers(): Promise<Player[]> {
		return await this.playerModel.getPlayers();
	}
	async getPlayerByNameId(name: string): Promise<Player[]> {
		return await this.playerModel.getPlayerByNameId(name);
	}
	async getPlayersByTeamName(teamName: string): Promise<Player[]> {
		return await this.playerModel.getPlayersByTeamName(teamName);
	}
	async registerPlayer(player: PlayerRegisterDTO): Promise<any> {
		const record = await this.playerModel.registerPlayer(player);
		const message = record["message"] as string;
		return message;
	}
	async updateCarreerStatsByPlayerId(playerId: number, playerCareerStatisticsDTO: PlayerUpdateCarreerStatistiscDTO): Promise<any> {
		const record = await this.playerModel.updateCarreerStatsByPlayerId(playerId, playerCareerStatisticsDTO);
		const message = record["message"] as string;
		return message;

	}
}
