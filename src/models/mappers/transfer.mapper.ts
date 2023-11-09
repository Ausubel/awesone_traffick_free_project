import Transfer from "../../entities/Transfer";

export default function transferMapper(record: any): Transfer {
    return {
    id: record["id"],
    transfertDate: record["transfer_date"],
    transfertFee: record["transfer_fee"],
    contractDurationSeasons: record["contract_duration_season"],
    realeaseClause: record["release_clause"],
    originalTeamId: record["origin_team_id"],
    newTeamId: record["destination_team_id"]
    }
}