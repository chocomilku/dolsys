import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
	return knex.schema.raw(`
        CREATE VIEW files_with_categories AS SELECT files.id, path, originalname, created_at, uid, downloadCount, user_id, categories.id AS category_id, name, code, scope_level FROM files INNER JOIN categories on files.category_id = categories.id;
    `);
}

export async function down(knex: Knex): Promise<void> {
	return knex.schema.raw(`
        DROP VIEW files_with_categories;
    `);
}
