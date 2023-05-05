import { Router } from "express";
import { dlRoute } from "./download";
import { fileMetadata } from "./fileMetadata";
import { listFilesMetadata } from "./listFilesMetadata";

const router: Router = Router();

router.use("/", dlRoute); // GET /files/:uid/download
router.use("/", fileMetadata); // GET /files/:uid
router.use("/", listFilesMetadata); // GET /files

export const fileRoutes: Router = router;
