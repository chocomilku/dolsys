import { Category, CategoryWithoutID } from "../../../../interfaces/Category";
import { InternalServerError, NotFoundError } from "../../../middleware/errors/errors";
import { db } from "../../config/db";
import { validateCategory } from "../../validators/categoryValidator";

export const updateCategoryInDB = async (id: number, category: CategoryWithoutID) => {

	const categoryExists = await db<Category>("categories").where({ id }).first();

	if (!categoryExists || categoryExists) throw new NotFoundError("Category does not exist");

	const validatedCategory = validateCategory(category);

	const rowsAffected = await db<Category>("categories").where({ id }).update(validatedCategory);

	if (rowsAffected === 0) throw new InternalServerError("Category was not updated");
};