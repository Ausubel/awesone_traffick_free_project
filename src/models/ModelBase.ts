import Database from "../db/Database";

export default class ModelBase {
	protected database: Database;
	constructor() {
		this.database = Database.getInstance();
	}
}
