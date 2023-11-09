import { ExtendedTeam } from "../../entities/Team";

export default function extendedTeamMapper(resulset: any[]): ExtendedTeam | null {
    if (!Array.isArray(resulset) || resulset.length === 0) return null;

    const team: ExtendedTeam = {
        id: resulset[0]["id"],
        teamName: resulset[0]["team_name"],
        budget: resulset[0]["budget"],
        country: resulset[0]["country"],
        league: resulset[0]["league"],
        players: [],
    };

    resulset.forEach((record) => {
        const player = {
            firstName: record["first_name"],
            lastName: record["last_name"],
            dateOfBirth: record["date_of_birth"],
            marketValue: record["market_value"],
        };
        team.players.push(player);
    });

    return team;
}