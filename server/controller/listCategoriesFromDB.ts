import { Categories } from "../../interfaces/Categories";
import { db } from "../middleware/knex/credentials";

export const listCategoriesFromDB = async () => {
	const response = await db<Categories>("categories");
	return response;
};
