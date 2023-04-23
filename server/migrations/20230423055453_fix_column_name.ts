import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
	return knex.schema.alterTable("files", (table) => {
		table.renameColumn("original_name", "originalname");
	});
}

export async function down(knex: Knex): Promise<void> {
	return knex.schema.alterTable("files", (table) => {
		table.renameColumn("originalname", "original_name");
	});
}
