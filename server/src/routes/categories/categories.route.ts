import { Router } from "express";
import { checkRequiredPermissions } from "../../middleware/checkPermissionsMiddleware";
import { addCategoryController } from "../../controllers/categories/addCategory.controller";
import { authMiddleware } from "../../middleware/authMiddleware";
import { updateCategoryController } from "../../controllers/categories/updateCategory.controller";
import { listCategoriesController } from "../../controllers/categories/listCategories.controller";

const router = Router();

router.get("/", listCategoriesController); // GET / (list all categories)
router.post("/", authMiddleware, checkRequiredPermissions(["create:category"]), addCategoryController); // POST /
router.put("/:id", authMiddleware, checkRequiredPermissions(["edit:category"]), updateCategoryController); // PUT /:id )

export const categoriesRoute = router;