import { FileWithCategory } from "../../../../interfaces/File";
import { db } from "../../config/db";

export const listFiles = async (page: number, limit: number, orderBy?: "asc" | "desc") => {

	const ORDER_BY: "asc" | "desc" = "asc";

	const offset = (page - 1) * limit;

	return await db<FileWithCategory>("files_with_categories").offset(offset).limit(limit).orderBy(orderBy ?? ORDER_BY);
};