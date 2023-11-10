import { ExtendedPlayer } from "../../entities/Player";

export default function extendedPlayerMapper(resultset: any): ExtendedPlayer | null {
    if (!resultset || resultset.length === 0 || !resultset) return null;

    const player: ExtendedPlayer = {
        id: resultset["id"],
        firstName: resultset["first_name"],
        lastName: resultset["last_name"],
        dateOfBirth: resultset["date_of_birth"],
        marketValue: resultset["market_value"],
        currentAgent: resultset["agent_name"],
        country: resultset["country"],
        careerStatistics: {
            goals: resultset["goals"],
            assists: resultset["assists"],
            matches: resultset["matches_played"],
        }
    };

    return player;
}
