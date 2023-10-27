import Fugitive from "../../entities/Player";

export default function fugitiveMapper(record: any): Fugitive {
	return {
		id: record["id"],
		first_name: record["first_name"],
        last_name: record["last_name"],
        date_of_birth: record["date_of_birth"],
        market_value: record["market_value"],
        current_contract_id: record["current_contract_id"],
        current_agent_id: record["current_agent_id"],
        career_statistics_id: record["career_statistics_id"],
        country_id: record["country"],
	};
}
