import { Router } from "express";
import { authMiddleware } from "../../middleware/authMiddleware";
import { checkRequiredPermissions } from "../../middleware/checkPermissionsMiddleware";
import { listFilesController } from "../../controllers/files/listFiles.controller";
import { getFileController } from "../../controllers/files/getFile.controller";
import { downloadFileController } from "../../controllers/files/downloadFile.controller";
import { deleteFileController } from "../../controllers/files/deleteFile.controller";
import { updateFileController } from "../../controllers/files/updateFile.controller";
import { uploadFile } from "../../services/files/uploadFile.service";

const router = Router();

router.get("/", authMiddleware, checkRequiredPermissions(["view:files"]), listFilesController); // GET / (list all files)
router.get("/:uid", getFileController); // GET /:uid (get file metadata)
router.get("/:uid/download", downloadFileController); // GET /:uid/download (download file)
router.post("/", authMiddleware, checkRequiredPermissions(["upload:files"]), uploadFile); // POST / (upload file)
router.put("/:uid", authMiddleware, checkRequiredPermissions(["edit:files"]), updateFileController); // PUT /:uid (update file)
router.delete("/:uid", authMiddleware, checkRequiredPermissions(["remove:files"]), deleteFileController); // DELETE /:uid (delete file)

export const filesRoute = router;