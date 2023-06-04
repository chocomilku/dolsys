import knex from "knex";
import dotenv from "dotenv";
import path from "path";

dotenv.config(
	process.env.NODE_ENV != "production" ? { path: path.join(__dirname, "../../.env") } :{});

export const db = knex({
	client: "mysql2",
	connection: {
		uri: process.env.DB_URL,
		database: process.env.DB_DB,
	},
});
