import { InternalServerError } from "../middleware/errors/errors";
import { db } from "../middleware/knex/credentials";
import { deleteFileFromFs } from "./deleteFileFromFs";

export const deleteFile = async (id: number, path: string) => {
	const response = await db("files").where({ id }).delete();

	if (!response) throw new InternalServerError("Failed to delete file");

	await deleteFileFromFs(path);
};
