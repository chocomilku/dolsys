import { Router } from "express";
import { z } from "zod";
import { addCategoryToDB } from "../../controller/addCategoryToDB";
import { TypedRequestBody } from "../../interfaces/typedExpress";
import { CategoriesWithoutID } from "../../../interfaces/Categories";

const router: Router = Router();

router.post("/", (req: TypedRequestBody<CategoriesWithoutID>) => {
	const category = req.body;

	const categorySchema = z.object({
		name: z.string(),
		code: z.string().max(12).optional(),
		scope_level: z.string().max(24).optional(),
	});

	const parsedCategory = categorySchema.parse(category);

	addCategoryToDB(parsedCategory);
});

export const addCategoryRoute: Router = router;
