import { Router } from "express";
import { indexRoute } from "./index.route";
import { uploadRoutes } from "./upload";
import { categoriesRoutes } from "./categories";
import { fileRoutes } from "./files";

const router: Router = Router();

router.use("/upload", uploadRoutes); // POST /upload
router.use("/categories", categoriesRoutes); // POST & GET /categories
router.use("/files", fileRoutes); // GET /files
router.use("/", indexRoute); // GET / (home callback)

export const routes: Router = router;
