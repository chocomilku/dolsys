import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
	return knex.schema.alterTable("files", (table) => {
		table.text("path").notNullable().alter();
		table.string("originalname").notNullable().alter();
		table
			.timestamp("created_at")
			.notNullable()
			.defaultTo(knex.fn.now())
			.alter();
		table.string("uid", 10).notNullable().alter();
		table.integer("downloadCount").notNullable().defaultTo(0).alter();
		table.string("user_id").notNullable().alter();
	});
}

export async function down(knex: Knex): Promise<void> {
	return knex.schema.alterTable("files", (table) => {
		table.text("path").nullable().alter();
		table.string("originalname").nullable().alter();
		table.timestamp("created_at").nullable().defaultTo(knex.fn.now()).alter();
		table.string("uid", 10).nullable().alter();
		table.integer("downloadCount").nullable().defaultTo(0).alter();
		table.string("user_id").nullable().alter();
	});
}
