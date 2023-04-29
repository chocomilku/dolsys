import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
	return knex.schema
		.createTable("categories", (table) => {
			table.increments("id", { primaryKey: true });
			table.text("name").notNullable();
			table.string("code", 12);
			table.string("scope_level", 24).defaultTo(null).nullable();
		})
		.alterTable("files", (table) => {
			table.integer("category_id").unsigned();
			// referencing foreign key is not supported by PlanetScale so we have to do it manually :(
		});
}

export async function down(knex: Knex): Promise<void> {
	return knex.schema.dropTableIfExists("categories");
}
