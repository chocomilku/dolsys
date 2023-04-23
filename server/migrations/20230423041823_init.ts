import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('files', (table)=> {
        table.increments("id", {primaryKey: true});
        table.text("path");
        table.string("original_name");
        table.timestamp("created_at").defaultTo(knex.fn.now());
        table.string("uid", 10);
    })
}

export async function down(knex: Knex): Promise<void> {
    knex.schema.dropTableIfExists('files')
}

