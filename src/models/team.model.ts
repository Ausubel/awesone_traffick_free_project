
import TeamRegisterDTO from "../controllers/dtos/TeamRegisterDTO";
import StoredProcedures from "../db/StoredProcedures";
import Team, { ExtendedTeam } from "../entities/Team";
import ModelBase from "./ModelBase";
import teamMapper from "./mappers/team.mapper";


export default class TeamModel extends ModelBase{
	async getTeams(): Promise<Team[]> {
		const [[resultset]] = (await this.database.query(
			StoredProcedures.GetAllTeams
		)) as [[any[]]];
		return resultset.map(teamMapper);
	}
	async registerTeam(team: TeamRegisterDTO): Promise<any> {
		const [[[record]]] = await this.database.query(
			StoredProcedures.RegisterTeam,
			[
				team.teamName,
				team.budget,	
				team.countryId,
				team.leagueId
			]
		);
		return record;
	}
}
