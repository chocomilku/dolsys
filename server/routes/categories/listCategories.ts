import { Router } from "express";
import { listCategoriesFromDB } from "../../controller/listCategoriesFromDB";

const router: Router = Router();

router.get("/", async (req, res, next) => {
	try {

		const categories = await listCategoriesFromDB();
	
		res.status(200).json(categories);
	} catch (error) {
		next(error);
	}
});

export const listCategoriesRoute: Router = router;
