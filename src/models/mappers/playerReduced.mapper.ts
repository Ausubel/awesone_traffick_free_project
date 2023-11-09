import Player from "../../entities/Player";

export default function playerReducedMapper(record: any): Player{
	return {
		id: record["id"],
		firstName: record["first_name"],
        lastName: record["last_name"],
        dateOfBirth: record["date_of_birth"],
        marketValue: record["market_value"]
	};
}
