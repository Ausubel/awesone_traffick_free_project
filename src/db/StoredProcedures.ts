export enum StoredProcedures {
	GetAllPlayers = "CALL get_all_players()",
	FindPlayerById = "CALL find_player_by_id(?);",
	GetCrimeTypes = "CALL get_crime_types()",
	RegisterFugitive = "CALL register_fugitive(?, ?, ?, ?, ?);",
}

export default StoredProcedures;
