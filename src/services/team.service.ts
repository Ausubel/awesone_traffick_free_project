import TeamRegisterDTO from "../controllers/dtos/TeamRegisterDTO";
import Team, { ExtendedTeam } from "../entities/Team";
import TeamModel from "../models/team.model";

export default class TeamService {
	private teamModel: TeamModel;
	constructor() {
		this.teamModel = new TeamModel();
	}
	async getTeams(): Promise<Team[]> {
		return await this.teamModel.getTeams();
	}
	async registerTeam(team: TeamRegisterDTO): Promise<string> {
		const record = await this.teamModel.registerTeam(team);
		const message = record["message"] as string;
		return message;
	}
}
