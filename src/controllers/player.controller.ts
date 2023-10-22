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
		this.onGetPlayers();
		this.onfindPlayer();
		this.onAddPlayer();
		this.onEditPlayer();
		this.onRemovePlayer();
	}
	private onGetPlayers() {
		this.router.get("/", async (_, res) => {
			const fugitives: Player[] =
				await this.fugitiveService.getPlayers();
			res.json(fugitives);
		});
	}
	private onfindPlayer() {
		this.router.get("/:id", (req, res) => {
			const fugitiveId: number = parseInt(req.params.id);
			const foundPlayer: Player =
				this.fugitiveService.findPlayer(fugitiveId);
			if (foundPlayer) {
				res.json(foundPlayer);
				return;
			}
			res.json({ message: "Player not found" });
		});
	}
	private onAddPlayer() {
		this.router.post("/", (req, res) => {
			const newPlayer: Player = this.fugitiveService.addPlayer(
				req.body
			);
			res.json(newPlayer);
		});
	}
	private onEditPlayer() {
		this.router.put("/", (req, res) => {
			const fugitive: Player = req.body;
			this.fugitiveService.editPlayer(fugitive);
			res.json(fugitive);
		});
	}
	private onRemovePlayer() {
		this.router.delete("/:id", (req, res) => {
			const fugitiveId: number = parseInt(req.params.id);
			this.fugitiveService.removePlayer(fugitiveId);
			res.json({ message: "Removed!" });
		});
	}
}
