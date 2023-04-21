import { Router } from "express";
import { indexRoute } from "./index.route";

const router: Router = Router();

router.use("/", indexRoute);

export const routes: Router = router;
