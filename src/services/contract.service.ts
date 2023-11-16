import ContractsModel from "../models/contracts.model";
import ContractRegisterDTO from "../controllers/dtos/ContractRegisterDTO";

export default class PlayerContractService{
	private PlayerContract: ContractsModel;
	constructor(){
		this.PlayerContract = new ContractsModel();
	}
	async getAllContractsByPlayerId(playerId: number){
		return await this.PlayerContract.getAllContractsByPlayerId(playerId);
	}
	async registerPlayerContractByPlayerId(playerId: number,playerContract: ContractRegisterDTO){
		const record = await this.PlayerContract.registerPlayerContractByPlayerId(playerId,playerContract);
		const message = record["message"] as string;
		return message;
	}

}