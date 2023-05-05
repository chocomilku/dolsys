import { FilesWithCategories } from "../../interfaces/FileMetadata";
import { db } from "../middleware/knex/credentials";

type FilesWithCategoriesColumns = keyof FilesWithCategories;

const availableColumns = Object.keys({} as FilesWithCategories);
const omittedSpecificColumns = (
	excludedColumns?: FilesWithCategoriesColumns[]
) => {
	if (!excludedColumns) return availableColumns;
	return availableColumns.filter(
		(column) => !excludedColumns.includes(column as FilesWithCategoriesColumns)
	);
};

export const getFileMetadata = async (uid: string) => {
	return await db<FilesWithCategories>("files_with_categories")
		.where({ uid })
		.first();
};

export const getFilesMetadata = async (
	excludedColumns?: FilesWithCategoriesColumns[]
) => {
	const columns = omittedSpecificColumns(excludedColumns);
	return await db<FilesWithCategories>("files_with_categories").select(columns);
};
