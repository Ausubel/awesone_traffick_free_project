import Transfer from "../entities/Transfer";
import TransferModel from "../models/transfer.model";

export default class TransferService {
	private transferModel: TransferModel;
	constructor() {
		this.transferModel = new TransferModel();
	}
	async getAllTransfersByTeamId(teamId: number): Promise<Transfer[]> {
		return await this.transferModel.getAllTransfersByTeamId(teamId);
	}
}
