import { Router } from "express";
import PlayerService from "../services/player.service";
import Player from "../entities/Player";
import ControllerBase from "./ControllerBase";

export default class PlayerController implements ControllerBase {
	private _root: string;
	private _router: Router;
	private fugitiveService: PlayerService;
	constructor() {
		this._root = "/players";
		this._router = Router();
		this.fugitiveService = new PlayerService();
		this.onEndpoints();
	}
	get root() {
		return this._root;
	}
	get router() {
		return this._router;
	}
	private onEndpoints() {
		this.onGetPlayers()
	}
	private onGetPlayers() {
		this.router.get("/", async (_, res) => {
			const fugitives: Player[] =
				await this.fugitiveService.getPlayers();
			res.json(fugitives);
		});
	}
}
