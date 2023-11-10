export enum StoredProcedures {
	GetAllPlayers = "CALL get_all_players()",
	GetPlayerByNameId = "CALL get_player_by_name(?)",
	GetPlayerByTeamName = "CALL get_players_by_team(?)",
	RegisterPlayer = "CALL register_player(?, ?, ?, ?, ?)",
	GetAllTeams = "CALL get_all_teams()",
	RegisterTeam = "CALL register_team(?, ?, ?, ?)",
	GetAllTransfersByTeamId = "CALL get_all_transfers_by_team_id(?)",
}

export default StoredProcedures;
	