import CarrierStatistics from "./CarrerStatistics";

type Player = {
    id?: number;
    firstName: string;
    lastName: string;
    dateOfBirth: Date;
    marketValue: number;
    currentAgent?: string;
    country?: string;
};

export type ExtendedPlayer = Player & {
    careerStatistics: CarrierStatistics;
};

export default Player;