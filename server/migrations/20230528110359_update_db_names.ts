import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
	return knex.schema
		.alterTable("files", (table) => {
			table.renameColumn("originalname", "file_name");
			table.renameColumn("downloadCount", "download_count");
		}).alterTable("categories", (table) => {
			table.string("color", 7).defaultTo("#000000");
		});
}


export async function down(knex: Knex): Promise<void> {
	return knex.schema
		.alterTable("files", (table) => {
			table.renameColumn("file_name", "originalname");
			table.renameColumn("download_count", "downloadCount");
		}).alterTable("categories", (table) => {
			table.dropColumn("color");
		});
}