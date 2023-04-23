import { Router } from "express";
import { indexRoute } from "./index.route";
import { uploadRoutes } from "./upload";
import { dlRoutes } from "./dl";

const router: Router = Router();

router.use("/upload", uploadRoutes);
router.use("/", indexRoute);
router.use("/", dlRoutes);

export const routes: Router = router;
