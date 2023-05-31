import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
	return knex.schema.raw(`
    ALTER VIEW files_with_categories AS (SELECT files.id, path, file_name, created_at, uid, download_count, user_id, title, phase_no, unit_no, categories.id AS category_id, name AS category_name, code AS category_code, scope_level AS category_scope_level, color AS category_color FROM files INNER JOIN categories ON files.category_id = categories.id);
    `);
}


export async function down(knex: Knex): Promise<void> {
	return knex.schema
		.raw(`
    ALTER VIEW files_with_categories AS (SELECT files.id, path, originalname, created_at, uid, downloadCount, user_id, title, phase_no, unit_no, categories.id AS category_id, name AS category_name, code AS category_code, scope_level AS category_scope_level, color AS category_color FROM files INNER JOIN categories ON files.category_id = categories.id);
    `);
};