import { db } from "../../config/db";
import { Category, CategoryWithoutID } from "../../../../interfaces/Category";
import { validateCategory } from "../../validators/categoryValidator";
import { InternalServerError } from "../../middleware/errors/errors";

export const addCategoryToDB = async (category: CategoryWithoutID) => {

	const validatedCategory = validateCategory(category);

	const [addedCategoryID] = await db<Category>("categories").insert(validatedCategory);

	const addedCategory = await db<Category>("categories").where({
		id: addedCategoryID,
	}).first();

	if (!addedCategory) throw new InternalServerError("Category was not added to the database");

	return addedCategory;
};