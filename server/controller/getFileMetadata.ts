import { FilesWithCategories } from "../../interfaces/FileMetadata";
import { db } from "../middleware/knex/credentials";

export const getFileMetadata = async (
	specificParams: Partial<FilesWithCategories>
) => {
	return await db<FilesWithCategories>("files_with_categories")
		.where(specificParams)
		.first();
};

export const getFilesMetadata = async () => {
	return await db<FilesWithCategories>("files_with_categories");
};
