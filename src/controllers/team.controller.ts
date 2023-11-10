import { Router } from "express";
import TeamService from "../services/team.service";
import Team, { ExtendedTeam } from "../entities/Team";
import ControllerBase from "./ControllerBase";
import ApiResponse from "../utils/http";
import TeamRegisterDTO from "./dtos/TeamRegisterDTO";

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
		this.router.get("/", async (req, res) => {
			const teams: Team[] =
			await this.teamService.getTeams()
			res.json(ApiResponse.complete<Team[]>("SUCCESS",teams));
			
		});
	}
	private onRegisterTeam() {
		this.router.post("/new", async (req, res) => {
			const body = req.body;
			if (!TeamRegisterDTO.isValid(body)) {
				res.status(500).json(ApiResponse.empty());
				return;
			}
			const teamRegisterDTO: TeamRegisterDTO = 
				new TeamRegisterDTO(body);
			const message: string = await this.teamService.registerTeam(
				teamRegisterDTO
			)
			if (message !== "SUCCESS") res.status(400).json(ApiResponse.empty());
			res.json(ApiResponse.complete<null>(message, null));
				
		})
	}
}
