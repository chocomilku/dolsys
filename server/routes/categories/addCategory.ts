import { NextFunction, Response, Router } from "express";
import { z } from "zod";
import { addCategoryToDB } from "../../controller/addCategoryToDB";
import { TypedRequestBody } from "../../interfaces/typedExpress";
import {
	Categories,
	CategoriesWithoutID,
} from "../../../interfaces/Categories";
import { db } from "../../middleware/knex/credentials";
import { authMiddleware } from "../../middleware/jwt-bearer/authOptions";
import { checkRequiredPermissions } from "../../middleware/auth0/checkPermissions";

const router: Router = Router();

router.post(
	"/",
	authMiddleware,
	checkRequiredPermissions(["create:category"]),
	async (
		req: TypedRequestBody<CategoriesWithoutID>,
		res: Response,
		next: NextFunction
	) => {
		try {
			const category = req.body;

			const categorySchema = z.object({
				name: z.string(),
				code: z.string().max(12).optional(),
				scope_level: z.string().max(24).optional(),
			});

			const parsedCategory = categorySchema.parse(category);

			const addedCategoryID = await addCategoryToDB(parsedCategory);

			const addedCategory = await db<Categories>("categories").where({
				id: addedCategoryID[0],
			});

			return res.status(201).json(addedCategory[0]);
		} catch (error) {
			next(error);
		}
	}
);

export const addCategoryRoute: Router = router;
