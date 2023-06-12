import { Category } from "../../../../interfaces/Category";
import { db } from "../../config/db";

export const listCategoriesFromDB = async () => {
	const response = await db<Category>("categories");
	return response;
};