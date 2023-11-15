import { Router } from "express";
import TeamService from "../services/team.service";
import Team, { ExtendedTeam } from "../entities/Team";
import ControllerBase from "./ControllerBase";
import ApiResponse from "../utils/http";
import TeamRegisterDTO from "./dtos/TeamRegisterDTO";
import { sendResponses } from "../utils/sendResponses";
import { USER_ROLE_IDS } from "../config/constants";
import { checkAuthToken } from "../utils/checkAuthToken";

export default class TeamController implements ControllerBase {
	private _root: string;
	private _router: Router;
	private teamService: TeamService;
	constructor() {
		this._root = "/teams";
		this._router = Router();
		this.teamService = new TeamService();
		this.onEndpoints();
	}
	get root() {
		return this._root;
	}
	get router() {
		return this._router;
	}
	private onEndpoints() {
		this.onGetTeams(),
		this.onRegisterTeam()
	}
	private onGetTeams() {
		this.router.get("/", async (_, res) => {
			const teams: Team[] =
			await this.teamService.getTeams()
			sendResponses(res, 200, null, teams);
			
		});
	}
	private onRegisterTeam() {
		this.router.post("/register",checkAuthToken(USER_ROLE_IDS.AGENT), async (req, res) => {
			const body = req.body;
			if (!TeamRegisterDTO.isValid(body)) {
				sendResponses(res, 400, "Bad Request");
				return;
			}
			const teamRegisterDTO: TeamRegisterDTO = 
				new TeamRegisterDTO(body);
			const message: string = await this.teamService.registerTeam(
				teamRegisterDTO
			)
			if (message !== "SUCCESS"){
				sendResponses(res, 400, message);
				return;
			};
			sendResponses(res, 200, message);
		})
	}
}
