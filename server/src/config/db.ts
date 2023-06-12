import knex from "knex";
import { secrets } from "./secrets";

export const db = knex({
	client: "mysql2",
	connection: {
		uri: secrets.DB_URL,
		database: secrets.DB_DB,
	},
});
