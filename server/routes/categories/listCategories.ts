import { Router } from "express";
import { listCategoriesFromDB } from "../../controller/listCategoriesFromDB";

const router: Router = Router();

router.get("/", async (req, res) => {
	const categories = await listCategoriesFromDB();

	res.status(200).json(categories);
});

export const listCategoriesRoute: Router = router;
