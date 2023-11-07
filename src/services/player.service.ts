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
}
