import { Application } from "express";
import PlayerController from "./player.controller";
import ControllerBase from "./ControllerBase";

export default class ControllerInitializer {
	private app: Application;
	private controllers: ControllerBase[];
	constructor(app: Application) {
		this.app = app;
		this.controllers = [
			new PlayerController()
		];
	}
	init() {
		this.controllers.forEach(({ root, router }) =>
			this.app.use(root, router)
		);
	}
}
