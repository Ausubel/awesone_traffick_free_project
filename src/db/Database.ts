import { Pool, createPool } from "mysql2/promise";

class DatabaseParameters {
	readonly host: string;
	readonly port: number;
	readonly user: string;
	readonly connectionLimit: number;
	readonly database: string;
	constructor() {
		this.host = process.env.DB_HOST;
		this.port = Number(process.env.DB_PORT);
		this.user = process.env.DB_USER;
		this.connectionLimit = Number(process.env.DB_CONNECTION_LIMIT);
		this.database = process.env.DB_NAME;
	}
}
export default class Database {
	private pool: Pool;
	private static instance: Database;
	private constructor() {
		const params = new DatabaseParameters();
		this.pool = createPool({ ...params, multipleStatements: true });
	}
	async query(sql: string, params?: any[]): Promise<any> {
		return await this.pool.query(sql, params);
	}
	static getInstance(): Database {
		if (!this.instance) return new Database();
		return this.instance;
	}
}
