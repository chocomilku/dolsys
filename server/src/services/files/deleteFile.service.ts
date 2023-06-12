import { db } from "../../config/db";
import { InternalServerError } from "../../middleware/errors/errors";
import fs from "fs";
import util from "util";

export const deleteFile = async (id: number, path: string) => {
	const response = await db("files").where({ id }).delete();

	if (!response) throw new InternalServerError("Failed to delete file");

	await deleteFileFromFs(path);
};

const unlinkAsync = util.promisify(fs.unlink);

const deleteFileFromFs = async (path: string) => {
	await unlinkAsync(path);
};