import { Router } from "express";
import TransferService from "../services/transfer.service";
import ControllerBase from "./ControllerBase";
import ApiResponse from "../utils/http";

import Transfer from "../entities/Transfer";

export default class TeamController implements ControllerBase {
	private _root: string;
	private _router: Router;
	private transferService: TransferService;
	constructor() {
		this._root = "/transfer";
		this._router = Router();
		this.transferService = new TransferService();
		this.onEndpoints();
	}
	get root() {
		return this._root;
	}
	get router() {
		return this._router;
	}
	private onEndpoints() {
		this.onGetTransfers()
	}
	private onGetTransfers() {
		this.router.get("/:id", async (req, res) => {
			const transferId: number = parseInt(req.params.id);
			const transfers: Transfer[] =
				await this.transferService.getAllTransfersByTeamId(transferId);
			// console.log(transfers)
			if (!transfers) res.status(400).json(ApiResponse.empty());
			res.json(ApiResponse.complete<Transfer[]>("SUCCESS", transfers));
		})
	}
}
