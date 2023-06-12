import { RequestHandler } from "express";
import { listCategoriesFromDB } from "../../services/categories/listCategories.service";

export const listCategoriesRoute: RequestHandler = async (req, res, next) => {
	try {
		const categories = await listCategoriesFromDB();
		return res.status(200).json(categories);
	} catch (error) {
		next(error);
	}
};