type Player = {
    id?: number;
    firstName: string;
    lastName: string;
    dateOfBirth: Date;
    marketValue: number;
    currentContractId?: number;
    currentAgentId?: number;
    careerStatisticsId?: number;
    countryId?: number;
};

export default Player;