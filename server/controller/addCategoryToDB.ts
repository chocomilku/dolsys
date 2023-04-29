import { db } from "../middleware/knex/credentials";
import { CategoriesWithoutID } from "../../interfaces/Categories";

export const addCategoryToDB = async (category: CategoriesWithoutID) => {
	const response = await db("categories").insert(category);
	return response;
};
