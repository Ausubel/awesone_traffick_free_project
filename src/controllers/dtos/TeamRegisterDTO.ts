import { isNumber } from "../../utils/validators";

export default class TeamRegisterDTO {
	readonly teamName: string;
    readonly budget: number;
    readonly countryId: number;
    readonly leagueId: number;
    constructor({ teamName, budget, countryId, leagueId }: any) {
        this.teamName = teamName;
        this.budget = budget;
        this.countryId = countryId;
        this.leagueId = leagueId;
    }
	
	static isValid(body: any) {
		return (
			body.teamName &&
            isNumber(body.budget) &&
            isNumber(body.countryId) &&
            isNumber(body.leagueId)
		);
	}
}
