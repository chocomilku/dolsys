import { db } from "../middleware/knex/credentials";
import { CategoryWithoutID } from "../../interfaces/Category";

export const addCategoryToDB = async (category: CategoryWithoutID) => {
	const response = await db("categories").insert(category);
	return response;
};
