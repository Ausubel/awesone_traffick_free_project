import Player from "../../entities/Player";

export default function fugitiveMapper(record: any): Player{
	return {
		id: record["id"],
		firstName: record["first_name"],
        lastName: record["last_name"],
        dateOfBirth: record["date_of_birth"],
        marketValue: record["market_value"],
        currentContractId: record["current_contract_id"],
        currentAgentId: record["current_agent_id"],
        careerStatisticsId: record["career_statistics_id"],
        countryId: record["country"],
	};
}
