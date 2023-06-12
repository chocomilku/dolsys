import { RequestHandler } from "express";
import { TypedRequestBody } from "../../../interfaces/typedExpress";
import { CategoryWithoutID } from "../../../../interfaces/Category";
import { z } from "zod";
import { updateCategoryInDB } from "../../services/categories/updateCategory.service";

export const updateCategoryRoute: RequestHandler = async (req: TypedRequestBody<CategoryWithoutID>, res, next) => {
	try {
		const id = z.coerce.number().parse(req.params.id);
		const body = req.body;

		await updateCategoryInDB(id, body);

		const updatedCategory = {id, ...body};
		return res.status(200).json(updatedCategory);

	} catch (error) {
		next(error);
	}
};