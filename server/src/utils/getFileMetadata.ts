import { FileWithCategory } from "../../../interfaces/File";
import { db } from "../config/db";
import { NotFoundError } from "../middleware/errors/errors";

export const getFileMetadata = async <T = FileWithCategory>(specificParams: Partial<FileWithCategory>, table = "files_with_categories") => {
	const file = await db(table)
    	.where(specificParams)
    	.first();
	if (!file)
    	throw new NotFoundError("File not found");

	return file as T;
};