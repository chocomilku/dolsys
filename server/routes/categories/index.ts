import { Router } from "express";
import { addCategoryRoute } from "./addCategory";
import { listCategoriesRoute } from "./listCategories";

const router: Router = Router();

router.use("/", listCategoriesRoute); // POST /
router.use("/", addCategoryRoute); // GET /

export const categoriesRoutes: Router = router;
