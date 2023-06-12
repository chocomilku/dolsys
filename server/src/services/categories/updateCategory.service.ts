import { Category, CategoryWithoutID } from "../../../../interfaces/Category";
import { InternalServerError, NotFoundError } from "../../middleware/errors/errors";
import { db } from "../../config/db";
import { validateCategory } from "../../validators/categoryValidator";

export const updateCategory = async (id: number, category: CategoryWithoutID) => {

	const categoryExists = await db<Category>("categories").where({ id }).first();
	if (!categoryExists) throw new NotFoundError("Category does not exist");

	const validatedCategory = validateCategory(category);

	const updateCategory = await db<Category>("categories").where({ id }).update(validatedCategory);

	if (updateCategory === 0) throw new InternalServerError("Category was not updated");

	const updatedCategory = await db<Category>("categories").where({ id }).first();
	if (!updatedCategory) throw new NotFoundError("Category does not exist");

	return updatedCategory;
};