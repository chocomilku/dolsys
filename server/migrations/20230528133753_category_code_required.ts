import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
	return knex.schema.alterTable("categories", (table) => {
		table.string("code").notNullable().alter();
	});
}


export async function down(knex: Knex): Promise<void> {
	return knex.schema.alterTable("categories", (table) => {
		table.string("code").nullable().alter();
	});
}

