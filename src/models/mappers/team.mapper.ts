import Team from "../../entities/Team";

export default function teamMapper(record: any): Team{
	return {
		teamName: record["team_name"],
        budget: record["budget"],
        country: record["country"],
        league: record["league"],
	};
}
