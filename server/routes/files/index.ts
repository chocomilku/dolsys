import { Router } from "express";
import { dlRoute } from "./download";
import { fileMetadata } from "./fileMetadata";
import { listFilesMetadata } from "./listFilesMetadata";
import { deleteFileRoute } from "./deleteFile";

const router: Router = Router();

router.use("/", dlRoute); // GET /files/:uid/download
router.use("/", fileMetadata); // GET /files/:uid
router.use("/", listFilesMetadata); // GET /files
router.use("/", deleteFileRoute); // DELETE /files/:uid
// TODO: add edit (PUT) file route

export const fileRoutes: Router = router;
