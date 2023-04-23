import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
	return knex.schema.table("files", (table) => {
		table.integer("downloadCount").defaultTo(0);
	});
}

export async function down(knex: Knex): Promise<void> {
	return knex.schema.table("files", (table) => {
		table.dropColumn("downloadCount");
	});
}
