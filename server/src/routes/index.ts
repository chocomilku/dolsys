import { Router } from "express";
import { filesRoute } from "./files/files.route";
import { categoriesRoute } from "./categories/categories.route";

const router = Router();

router.use("/files", filesRoute); // /files
router.use("/categories", categoriesRoute); // /categories

export const routes = router;