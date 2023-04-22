import { Router } from "express";
import { indexRoute } from "./index.route";
import { uploadRoutes } from "./upload";

const router: Router = Router();

router.use("/", indexRoute);
router.use("/upload", uploadRoutes);

export const routes: Router = router;
