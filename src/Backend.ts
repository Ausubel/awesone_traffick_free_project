import dotenv from "dotenv";
import express, { Application } from "express";
import ControllerInitializer from "./controllers";
import Database from "./db/Database";

export default class Backend {
	private app: Application;
	static database: Database;
	constructor() {
		this.app = express();
	}
	setup() {
		this.setupDotenv();
		this.setupRequestWithJson();
		this.setupDatabase();
		this.setupControllers();
	}
	private setupRequestWithJson() {
		this.app.use(
			express.json({
				limit: "5mb",
			})
		);
	}
	private setupDatabase() {
		Backend.database = new Database();
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
