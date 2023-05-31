import { Category } from "../../interfaces/Category";
import { db } from "../middleware/knex/credentials";

export const listCategoriesFromDB = async () => {
	const response = await db<Category>("categories");
	return response;
};
