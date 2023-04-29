import { Response, Router } from "express";
import { upload } from "../../middleware/multer/upload";
import { addFileMetadata } from "../../controller/addFileMetadata";
import type { FileMetadataWithID } from "../../../interfaces/FileMetadata";
import { db } from "../../middleware/knex/credentials";
import { TypedRequestBody } from "../../interfaces/typedExpress";
import { authMiddleware } from "../../middleware/jwt-bearer/authOptions";
import { checkRequiredPermissions } from "../../middleware/auth0/checkPermissions";

const router: Router = Router();

router.post(
	"/",
	upload.single("file"),
	authMiddleware,
	checkRequiredPermissions(["upload:files"]),
	async (req: TypedRequestBody<{ user_id: string }>, res: Response) => {
		if (!req.file) return res.status(400).json({ message: "No file uploaded" });

		const addedId = await addFileMetadata({
			path: req.file.path,
			originalname: req.file.originalname,
			user_id: req.body.user_id,
		});

		if (!addedId) throw new Error("Failed to add file metadata");

		const addedFile = await db<FileMetadataWithID>("files").where({
			id: addedId[0],
		});

		res.status(201).json(addedFile[0]);
	}
);

export const uploadRoutes: Router = router;
