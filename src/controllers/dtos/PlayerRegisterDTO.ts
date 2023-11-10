import { isNumber, isString, isDateValid } from "../../utils/validators";

export default class PlayerRegisterDTO {
    readonly firstName: string;
    readonly lastName: string;
    readonly dateOfBirth: Date;
    readonly marketValue: number;
    readonly countryId: number;
    constructor({ firstName, lastName, dateOfBirth, marketValue, countryId }: any) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.dateOfBirth = dateOfBirth;
        this.marketValue = marketValue;
        this.countryId = countryId;
    }
    static isValid(body: any) {
        return (
            isString(body.firstName) &&
            isString(body.lastName) &&
            isDateValid(body.dateOfBirth) &&
            isNumber(body.marketValue) &&
            isNumber(body.countryId)
        );
    }
}

