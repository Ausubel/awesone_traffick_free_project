import dotenv from "dotenv";
import express, { Application } from "express";
import ControllerInitializer from "./controllers";
import Encripter from "./utils/encripter";
import Tokenizer from "./utils/tokenizer";

export default class Backend {
	private app: Application;
	constructor() {
		this.app = express();
	}
	setup() {
		this.setupDotenv();
		Encripter.init();
		Tokenizer.init();
		this.setupRequestWithJson();
		this.setupControllers();
	}
	private setupRequestWithJson() {
		this.app.use(
			express.json({
				limit: "5mb",
			})
		);
	}
	private setupControllers() {
		new ControllerInitializer(this.app).init();
	}
	private setupDotenv() {
		dotenv.config();
	}
	start() {
		const PORT = process.env.PORT;
		this.app.listen(PORT, () => {
			console.log(`Server listen on port ${PORT}`);
		});
	}
}
