import { Router } from "express";
import TeamService from "../services/team.service";
import Team, { ExtendedTeam } from "../entities/Team";
import ControllerBase from "./ControllerBase";
import ApiResponse from "../utils/http";

export default class PlayerController implements ControllerBase {
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
		// this.onGetTeams(),
		this.onGetTeamByName()
	}
	private onGetTeams() {
		this.router.get("/", async (_, res) => {
			const teams: Team[] =
			await this.teamService.getTeams()
			res.json(ApiResponse.complete<Team[]>("SUCCESS",teams));
		});
	}
	private onGetTeamByName() {
		this.router.get("/", async (req, res) => {
			const name: string = req.query.name as string;
			const foundTeam: ExtendedTeam = 
				await this.teamService.getTeamByName(name);
			res.json(ApiResponse.complete<ExtendedTeam>("SUCCESS",foundTeam));
		})
	}
}
