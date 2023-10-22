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
	findPlayer(playerId: number): Player {
		return this.playerModel.findPlayer(playerId);
	}
	addPlayer(Player: Player): Player {
		return this.playerModel.addPlayer(Player);
	}
	editPlayer(Player: Player): void {
		this.playerModel.editPlayer(Player);
	}
	removePlayer(playerId: number): void {
		this.playerModel.removePlayer(playerId);
	}
}
