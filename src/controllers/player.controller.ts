import { Router } from "express";
import PlayerService from "../services/player.service";
import Player from "../entities/Player";
import ControllerBase from "./ControllerBase";
import ApiResponse from "../utils/http";
import PlayerRegisterDTO from "./dtos/PlayerRegisterDTO";
import PlayerUpdateCarreerStatistiscDTO from "./dtos/PlayerUpdateCarreerStatistiscDTO";
import { sendResponses } from "../utils/sendResponses";
import { checkAuthToken } from "../utils/checkAuthToken";
import { USER_ROLE_IDS } from "../config/constants";


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
		this.onUpdateCarreerStatsByPlayerId()
	}
	private onGetPlayers() {
		this.router.get("/", async (_, res) => {
			const players: Player[] = await this.playerService.getPlayers();
			sendResponses(res, 200, null, players);
		});
	}
	
	private onGetPlayerByNameId() {
		this.router.get("/search", async (req, res) => {
			const name: string = req.query.name as string;
			const players: Player[] = await this.playerService.getPlayerByNameId(name);
			sendResponses(res, 200, null, players);
		});
	}
	private onGetPlayersByTeamName() {
		this.router.get("/team/:teamName", async (req, res) => {
			const teamName: string = req.params.teamName;
			const players: Player[] = await this.playerService.getPlayersByTeamName(teamName);
			sendResponses(res, 200, null, players);
		});
	}
	private onRegisterPlayer() {
		this.router.post("/register",checkAuthToken(USER_ROLE_IDS.GUEST), async (req, res) => {
			const body = req.body;
			if (!PlayerRegisterDTO.isValid(body)) {
				sendResponses(res, 400, "Invalid body", null);
				return;
			}
			const playerRegisterDTO: PlayerRegisterDTO = new PlayerRegisterDTO(body);
			const message: string = await this.playerService.registerPlayer(playerRegisterDTO);
			if (message !== "SUCCESS") {
				sendResponses(res, 400, message, null);
				return;
			}
			sendResponses(res, 201, message, null);
		});
	}
	private onUpdateCarreerStatsByPlayerId() {
		this.router.put("/:id/update-stats",checkAuthToken(USER_ROLE_IDS.AGENT), async (req, res) => {
			const playerId: number = parseInt(req.params.id);
			const body = req.body;
			if (!PlayerUpdateCarreerStatistiscDTO.isValid(body)) {
				sendResponses(res, 400, "Invalid body", null);
				return;
			}
			const playerUpdateCarreerStatistisc: PlayerUpdateCarreerStatistiscDTO = new PlayerUpdateCarreerStatistiscDTO(body);
			const message: string = await this.playerService.updateCarreerStatsByPlayerId(playerId, playerUpdateCarreerStatistisc);
			console.log(message);
			if (message !== "SUCCESS") {
				sendResponses(res, 400, message, null);
				return;}
			console.log(message);
			sendResponses(res, 201, message, null);
			
		})
	}
}
