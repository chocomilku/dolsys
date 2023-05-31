import { FileWithCategory } from "../../interfaces/File";
import { db } from "../middleware/knex/credentials";

export const getFileMetadata = async (
	specificParams: Partial<FileWithCategory>
) => {
	return await db<FileWithCategory>("files_with_categories")
		.where(specificParams)
		.first();
};

interface GetFilesMetadataParams {
	offset?: number;
	limit?: number;
	orderBy?: "asc" | "desc";
}

export const getFilesMetadata = async (params?: GetFilesMetadataParams) => {
	const OFFSET = 0;
	const LIMIT = 10;
	const ORDER_BY: GetFilesMetadataParams["orderBy"] = "asc";

	const [offset, limit, orderBy] = [
		params?.offset,
		params?.limit,
		params?.orderBy,
	];
	return await db<FileWithCategory>("files_with_categories")
		.offset(offset ?? OFFSET)
		.limit(limit ?? LIMIT)
		.orderBy("id", orderBy ?? ORDER_BY);
};
