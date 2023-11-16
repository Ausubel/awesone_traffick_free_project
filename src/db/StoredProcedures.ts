export enum StoredProcedures {
  GetAllPlayers = "CALL get_all_players()",
  GetPlayerByNameId = "CALL get_player_by_name(?)",
  GetPlayerByTeamName = "CALL get_players_by_team(?)",
  RegisterPlayer = "CALL register_player(?, ?, ?, ?, ?)",
  GetAllTeams = "CALL get_all_teams()",
  RegisterTeam = "CALL register_team(?, ?, ?, ?)",
  GetAllTransfersByTeamId = "CALL get_all_transfers_by_team_id(?)",
  UpdateCarreerStatsByPlayerId = "CALL update_carreer_stats_by_player_id(?, ?, ?, ?)",
  GetAllContractsByPlayerId = "CALL get_all_contracts_by_player_id(?)",
  RegisterPlayerContract = "CALL update_player_contract(?, ?, ?, ?, ?, ?)",
  GetPasswordByUserName = "CALL get_password_by_username(?)",
  GetUserDataById = "CALL get_user_data(?)",
  RegisterUserGuest = "CALL register_user_guest(?, ?, ?, ?)",
  RegisterUserAgent = "CALL register_user_agent(?, ?, ?, ?)",
}

export default StoredProcedures;
	