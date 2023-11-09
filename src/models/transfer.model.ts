
import transferMapper from "./mappers/transfer.mapper";
import Transfer from "../entities/Transfer";
import ModelBase from "./ModelBase";
import StoredProcedures from "../db/StoredProcedures";


export default class TransferModel extends ModelBase{
	async getAllTransfersByTeamId(transferId: number): Promise<Transfer[]> {
		const [[resultset]] = await this.database.query(
			StoredProcedures.GetAllTransfersByTeamId,
			[transferId]
		);
		if (!Array.isArray(resultset) || resultset.length === 0) return null;
		return resultset.map(transferMapper);
	}
}
