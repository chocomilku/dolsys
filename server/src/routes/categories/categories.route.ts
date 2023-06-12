import { Router } from "express";
import { checkRequiredPermissions } from "../../../middleware/auth0/checkPermissions";
import { addCategoryRoute } from "../../controllers/categories/addCategory.controller";
import { authMiddleware } from "../../../middleware/jwt-bearer/authOptions";
import { updateCategoryRoute } from "../../controllers/categories/updateCategory.controller";
import { listCategoriesRoute } from "../../controllers/categories/listCategories.controller";

const router = Router();

router.get("/", listCategoriesRoute); // GET / (list all categories)
router.post("/", authMiddleware, checkRequiredPermissions(["create:category"]), addCategoryRoute); // POST /
router.put("/:id", authMiddleware, checkRequiredPermissions(["edit:category"]), updateCategoryRoute); // PUT /:id )

export const categoriesRoute = router;