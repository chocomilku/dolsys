import { Router } from "express";
import { indexRoute } from "./index.route";
import { uploadRoutes } from "./upload";
import { dlRoutes } from "./download";

const router: Router = Router();

router.use("/upload", uploadRoutes); // POST /upload
router.use("/", indexRoute); // GET / (home callback)
router.use("/", dlRoutes); // GET /:uid

export const routes: Router = router;
