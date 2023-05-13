import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
	return knex.schema.table("files", (table) => {
		table.string("title").nullable();
		table.string("phase_no").nullable();
		table.string("unit_no").nullable();
	});
}

export async function down(knex: Knex): Promise<void> {
	return knex.schema.table("files", (table) => {
		table.dropColumn("title");
		table.dropColumn("phase_no");
		table.dropColumn("unit_no");
	});
}
