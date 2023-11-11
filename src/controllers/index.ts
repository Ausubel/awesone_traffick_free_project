import { Application } from "express";
import PlayerController from "./player.controller";
import TeamComtroller from "./team.controller";
import TransferController from "./transfer.controller";
import ControllerBase from "./ControllerBase";
import PlayerContractController from "./player_contracs.controller";

export default class ControllerInitializer {
	private app: Application;
	private controllers: ControllerBase[];
	constructor(app: Application) {
		this.app = app;
		this.controllers = [
			new PlayerController(),
			new TeamComtroller(),
			new TransferController(),
			new PlayerContractController(),
		];
	}
	init() {
		this.controllers.forEach(({ root, router }) =>
			this.app.use(root, router)
		);
	}
}
