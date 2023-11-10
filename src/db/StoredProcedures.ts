export enum StoredProcedures {
	GetAllPlayers = "CALL get_all_players()",
	GetAllTeams = "CALL get_all_teams()",
	RegisterTeam = "CALL register_team(?, ?, ?, ?)",
	GetAllTransfersByTeamId = "CALL get_all_transfers_by_team_id(?)",
}

export default StoredProcedures;
	