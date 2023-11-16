import { Application } from "express";
import PlayerController from "./player.controller";
import TeamComtroller from "./team.controller";
import TransferController from "./transfer.controller";
import ControllerBase from "./ControllerBase";
import ContractsController from "./contract.controller";
import AuthController from "./auth.controler";
import RegisterController from "./register.controler";

export default class ControllerInitializer {
	private app: Application;
	private controllers: ControllerBase[];
	constructor(app: Application) {
		this.app = app;
		this.controllers = [
			new PlayerController(),
			new TeamComtroller(),
			new TransferController(),
			new ContractsController(),
			new AuthController(),
			new RegisterController()
		];
	}
	init() {
		this.controllers.forEach(({ root, router }) =>
			this.app.use(root, router)
		);
	}
}
