import StoredProcedures from "../db/StoredProcedures";
import Contract from "../entities/Contract";
import ModelBase from "./ModelBase";
import contractMapper from "./mappers/contract.mapper";

export default class PlayerContractsModel extends ModelBase{
    async getAllContractsByPlayerId(playerId: number): Promise<Contract[]> {
        const [[resultset]] = (await this.database.query(
            StoredProcedures.GetAllContractsByPlayerId,
            [playerId]
        )) as [[any[]]];    
        return resultset.map(contractMapper);
    }
    async registerPlayerContract(playerId: number,playerContract: Contract): Promise<any> {
        if (isNaN(playerContract.salary) || isNaN(playerContract.realeaseClause)) {
            throw new Error('Invalid numeric values in playerContract');
        }
        const [[[record]]]  = await this.database.query(
            StoredProcedures.RegisterPlayerContract,
            [
                playerId,
                playerContract.startDate,
                playerContract.endDate,
                playerContract.salary,
                playerContract.realeaseClause,
                playerContract.teamId
            ]
        );
        console.log(record.message)
        return record;
    }
};