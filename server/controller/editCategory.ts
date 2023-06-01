import { Category, CategoryWithoutID } from "../../interfaces/Category";
import { InternalServerError, NotFoundError } from "../middleware/errors/errors";
import { db } from "../middleware/knex/credentials";

export const editCategory = async (id: number, category: CategoryWithoutID) => {
	const checkCategory = await db<Category>("categories")
		.where({ id })
		.first();

	if (!checkCategory) throw new NotFoundError("Category not found");

	const updateCategory = await db<Category>("categories")
		.where({ id })
		.update({
			name: category.name,
			code: category.code,
			scope_level: category.scope_level,
			color: category.color,
		});

	if (!updateCategory)
		throw new InternalServerError("Failed to update category");
};