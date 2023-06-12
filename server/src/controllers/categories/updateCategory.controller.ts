import { RequestHandler } from "express";
import { z } from "zod";
import { updateCategory } from "../../services/categories/updateCategory.service";

export const updateCategoryController: RequestHandler = async (req, res, next) => {
	try {
		const id = z.coerce.number().parse(req.params.id);
		const body = req.body;

		const updatedCategory = await updateCategory(id, body);

		return res.status(200).json(updatedCategory);

	} catch (error) {
		next(error);
	}
};