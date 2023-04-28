import type { Knex } from "knex";
import dotenv from "dotenv";
import path from "path";

dotenv.config({
	path: path.join(__dirname, "../.env"),
});
// Update with your config settings.

const config: { [key: string]: Knex.Config } = {
	dev: {
		client: "mysql2",
		connection: {
			uri: process.env.DB_URL,
			database: process.env.DB_DB,
		},
		migrations: {
			directory: path.join(__dirname + "/migrations"),
		},
	},
};

module.exports = config;
