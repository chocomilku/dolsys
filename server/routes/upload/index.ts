import { Response, Router } from "express";
import { z } from "zod";

import { upload } from "../../middleware/multer/upload";
import { addFileMetadata } from "../../controller/addFileMetadata";
import type { FileMetadataWithID } from "../../../interfaces/FileMetadata";
import { db } from "../../middleware/knex/credentials";
import { TypedRequestBody } from "../../interfaces/typedExpress";
import { authMiddleware } from "../../middleware/jwt-bearer/authOptions";
import { checkRequiredPermissions } from "../../middleware/auth0/checkPermissions";
import { InternalServerError } from "../../middleware/errors/errors";

const router: Router = Router();

router.post(
	"/",
	upload.single("file"),
	authMiddleware,
	checkRequiredPermissions(["upload:files"]),
	async (
		req: TypedRequestBody<{ user_id: string; category_id: number }>,
		res: Response
	) => {
		if (!req.file) return res.status(400).json({ message: "No file uploaded" });

		const { user_id, category_id } = req.body;
		const checkedBody = z
			.object({
				user_id: z.string(),
				category_id: z.number(),
			})
			.parse({ user_id, category_id });

		const addedId = await addFileMetadata({
			path: req.file.path,
			originalname: req.file.originalname,
			user_id: checkedBody.user_id,
			category_id: checkedBody.category_id,
		});

		if (!addedId) throw new InternalServerError("Failed to add file metadata");

		const addedFile = await db<FileMetadataWithID>("files").where({
			id: addedId[0],
		});

		res.status(201).json(addedFile[0]);
	}
);

export const uploadRoutes: Router = router;
