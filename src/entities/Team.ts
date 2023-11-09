import Player from "./Player";

type Team = {
    id?: number;
    teamName: string;
    budget: string;
    country: string;
    league: string;
};

export type ExtendedTeam = Team & {
    players: Player[];
};

export default Team;