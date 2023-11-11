import PlayerContractsModel from "../models/player_contracts.model";
import ContractRegisterDTO from "../controllers/dtos/ContractRegisterDTO";

export default class PlayerContractService{
    private PlayerContract: PlayerContractsModel;
    constructor(){
        this.PlayerContract = new PlayerContractsModel();
    }
    async getAllContractsByPlayerId(playerId: number){
        return await this.PlayerContract.getAllContractsByPlayerId(playerId);
    }
    async registerPlayerContract(playerId: number,playerContract: ContractRegisterDTO){
        const record = await this.PlayerContract.registerPlayerContract(playerId,playerContract);
        const message = record["message"] as string;
        return message;
    }
}