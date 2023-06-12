import { z } from "zod";
import { CategoryWithoutID } from "../../../interfaces/Category";

const categoryValidatorSchema = z.object({
	name: z.string(),
	code: z.string().max(12),
	scope_level: z.string().max(24).optional(),
	color: z.string().max(7).optional(),
});


export const validateCategory = (category: CategoryWithoutID) => {
	const parsedCategory = categoryValidatorSchema.parse(category);
	return parsedCategory;
};