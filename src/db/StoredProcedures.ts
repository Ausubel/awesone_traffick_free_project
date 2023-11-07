export enum StoredProcedures {
	GetAllPlayers = "CALL get_all_players()",
	GetAllTeams = "CALL get_all_teams()",
	GetTeamByName = "CALL get_team_by_name(?)",
}

export default StoredProcedures;
	