
import StoredProcedures from "../db/StoredProcedures";
import Team, { ExtendedTeam } from "../entities/Team";
import ModelBase from "./ModelBase";
import extendedTeamMapper from "./mappers/extendedTeam.mapper";
import teamMapper from "./mappers/team.mapper";


export default class TeamModel extends ModelBase{
	async getTeams(): Promise<Team[]> {
		const [[resultset]] = (await this.database.query(
			StoredProcedures.GetAllTeams
		)) as [[any[]]];
		return resultset.map(teamMapper);
	}
	async getTeamByName(name: string): Promise<ExtendedTeam> {
		const [[resultset]] = await this.database.query(
			StoredProcedures.GetTeamByName,
			[name]
		);
		if (!Array.isArray(resultset) || resultset.length === 0) return null;
		return extendedTeamMapper(resultset);
	}
}
