import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
	return knex.schema.alterTable("files", (table) => {
		table.integer("category_id").unsigned().notNullable().alter();
	});
}


export async function down(knex: Knex): Promise<void> {
	return knex.schema.alterTable("files", (table) => {
		table.integer("category_id").unsigned().alter();
	});
}

