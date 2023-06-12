import { RequestHandler} from "express";
import { addCategoryToDB } from "../../services/categories/addCategory.service";

export const addCategoryRoute: RequestHandler = async (req, res, next) => {
	try {
		const categoryBody = req.body;

		const insertedCategory = await addCategoryToDB(categoryBody);

		return res.status(201).json(insertedCategory);
            
	} catch (error) {
		next (error);
	}
};