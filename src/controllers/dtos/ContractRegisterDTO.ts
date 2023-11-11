import { isNumber, isDateValid } from "../../utils/validators";

export default class ContractRegisterDTO {
    readonly startDate: Date;
    readonly endDate: Date;
    readonly salary: number;
    readonly realeaseClause: number;
    readonly teamId: number;
    constructor({ startDate, endDate, salary, realeaseClause, teamId }: any) {
        this.startDate = startDate;
        this.endDate = endDate;
        this.salary = salary;
        this.realeaseClause = realeaseClause;
        this.teamId = teamId;
    }
    static isValid(body: any) {
        return (
            isDateValid(body.startDate) &&
            isDateValid(body.endDate) &&
            isNumber(body.salary) &&
            isNumber(body.realeaseClause) &&
            isNumber(body.teamId)
        );
    }
}
