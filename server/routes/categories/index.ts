import { Router } from "express";
import { addCategoryRoute } from "./addCategory";
import { listCategoriesRoute } from "./listCategories";
import { updateCategoryRoute } from "./updateCategory";

const router: Router = Router();

router.use("/", listCategoriesRoute); // POST /
router.use("/", addCategoryRoute); // GET /
router.use("/", updateCategoryRoute); // PUT /:id

export const categoriesRoutes: Router = router;
