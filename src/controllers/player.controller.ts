import { Router } from "express";
import PlayerService from "../services/player.service";
import Player from "../entities/Player";
import ControllerBase from "./ControllerBase";
import ApiResponse from "../utils/http";
import PlayerRegisterDTO from "./dtos/PlayerRegisterDTO";

export default class PlayerController implements ControllerBase {
	private _root: string;
	private _router: Router;
	private playerService: PlayerService;
	constructor() {
		this._root = "/players";
		this._router = Router();
		this.playerService = new PlayerService();
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
		this.onGetPlayerByNameId()
		this.onGetPlayersByTeamName()
		this.onRegisterPlayer()
	}
	private onGetPlayers() {
		this.router.get("/", async (_, res) => {
			const players: Player[] = await this.playerService.getPlayers();
			res.json(players);
		});
	}
	
	private onGetPlayerByNameId() {
		this.router.get("/search", async (req, res) => {
			const name: string = req.query.name as string;
			const players: Player[] = await this.playerService.getPlayerByNameId(name);
			res.json(ApiResponse.complete<Player[]>("SUCCESS", players));
		});
	}
	private onGetPlayersByTeamName() {
		this.router.get("/team/:teamName", async (req, res) => {
			const teamName: string = req.params.teamName;
			const players: Player[] = await this.playerService.getPlayersByTeamName(teamName);
			res.json(ApiResponse.complete<Player[]>("SUCCESS", players));
		});
	}
	private onRegisterPlayer() {
		this.router.post("/register", async (req, res) => {
			const body = req.body;
			if (!PlayerRegisterDTO.isValid(body)) {
				res.status(400).json(ApiResponse.empty());
				return;
			}
			const playerRegisterDTO: PlayerRegisterDTO = new PlayerRegisterDTO(body);
			const message: string = await this.playerService.registerPlayer(playerRegisterDTO);
			if (message !== "SUCCESS") res.status(400).json(ApiResponse.empty());
			res.json(ApiResponse.complete<null>(message, null));
		});
	}
}
