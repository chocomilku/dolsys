import { Router } from "express";
import { TypedRequestBody } from "../../interfaces/typedExpress";
import { Category, CategoryWithoutID } from "../../../interfaces/Category";
import { NotFoundError } from "../../middleware/errors/errors";
import { db } from "../../middleware/knex/credentials";
import {z} from "zod";
import { editCategory } from "../../controller/editCategory";
import { authMiddleware } from "../../middleware/jwt-bearer/authOptions";
import { checkRequiredPermissions } from "../../middleware/auth0/checkPermissions";

const router = Router();

router.put("/:id", authMiddleware, checkRequiredPermissions(["edit:category"]), async (req: TypedRequestBody<CategoryWithoutID>, res, next) => {
	try {
		const { id } = req.params;

		const idCheck = z.coerce.number().parse(id);

		const checkCategory = await db<Category>("categories")
			.where({ id: idCheck })
			.first();

		if (!checkCategory) throw new NotFoundError("Category not found");

		const reqCategoryBody = req.body;

		const checkedBody = z
			.object({
				name: z.string(),
				code: z.string().max(12),
				scope_level: z.string().max(24).optional(),
				color: z.string().max(7).optional(),
			})
			.parse({
				name: reqCategoryBody.name,
				code: reqCategoryBody.code,
				scope_level: reqCategoryBody.scope_level,
				color: reqCategoryBody.color,
			});

		await editCategory(idCheck, checkedBody);

		res.status(204);

	} catch (error) {
		next(error);
	}
});

export const updateCategoryRoute = router;