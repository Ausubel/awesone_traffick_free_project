import Contract from "../../entities/Contract";
export default function contractMapper(resultset: any): Contract {
    if (!resultset || resultset.length === 0 || !resultset) return null;
    const contract: Contract = {
        id: resultset["id"],
        startDate: resultset["start_date"],
        endDate: resultset["end_date"],
        salary: resultset["salary"],
        realeaseClause: resultset["release_clause"],
        team: resultset["team_name"],
    }
    return contract;
}