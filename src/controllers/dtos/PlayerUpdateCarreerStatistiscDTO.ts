import {isNumber} from "../../utils/validators";

export default class PlayerUpdateCarreerStatistiscDTO {
    readonly goals: number;
    readonly assists: number;
    readonly matches: number;
    constructor ({ goals, assists, matches }: any) {
        this.goals = goals;
        this.assists = assists;
        this.matches = matches;
    }
    static isValid(body: any) {
        return(
        isNumber(body.goals) &&
        isNumber(body.assists) &&
        isNumber(body.matches)
        );
    }
}