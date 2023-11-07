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
	async getTeamByName(name: string): Promise<ExtendedTeam> {
		return await this.teamModel.getTeamByName(name);
	}
}
