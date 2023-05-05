import { FilesWithCategories } from "../../interfaces/FileMetadata";
import { db } from "../middleware/knex/credentials";

export const getFileMetadata = async (uid: string) => {
	return await db<FilesWithCategories>("files_with_categories")
		.where({ uid })
		.first();
};
