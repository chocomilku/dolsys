import { Router } from "express";
import { indexRoute } from "./index.route";
import { uploadRoutes } from "./upload";
import { dlRoutes } from "./dl";

const router: Router = Router();

router.use("/upload", uploadRoutes); // POST /upload
router.use("/", indexRoute); // GET / (upload form)
router.use("/", dlRoutes); // GET /:uid

export const routes: Router = router;
