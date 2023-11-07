import { ExtendedTeam } from "../../entities/Team";

export default function extendedTeamMapper(
    resulset: any[]
): ExtendedTeam {
    const [header] = resulset;
    const team: ExtendedTeam = {
        id: header["id"],
        teamName: header["team_name"],
        budget: header["budget"],
        country: header["country"],
        league: header["league"],
        players: [],
    };
    resulset.forEach((record) => {
        const playerId: number = record["player_id"];
        if (!team.players.some(( { id } ) => id === playerId)) {
            team.players.push({
                firstName: record["first_name"],
                lastName: record["last_name"],
                dateOfBirth: record["date_of_birth"],
                marketValue: record["market_value"],
            });
        }
    })
    return team
}