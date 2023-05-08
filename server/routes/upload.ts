import { NextFunction, Response, Router } from "express";
import { z } from "zod";

import { upload } from "../middleware/multer/upload";
import { addFileMetadata } from "../controller/addFileMetadata";
import { TypedRequestBody } from "../interfaces/typedExpress";
import { authMiddleware } from "../middleware/jwt-bearer/authOptions";
import { checkRequiredPermissions } from "../middleware/auth0/checkPermissions";
import {
	BadRequestError,
	InternalServerError,
} from "../middleware/errors/errors";
import { getFileMetadata } from "../controller/getFileMetadata";

const router: Router = Router();

router.post(
	"/",
	upload.single("file"),
	authMiddleware,
	checkRequiredPermissions(["upload:files"]),
	async (
		req: TypedRequestBody<{ user_id: string; category_id: number }>,
		res: Response,
		next: NextFunction
	) => {
		try {
			if (!req.file) throw new BadRequestError("No file was uploaded");

			const { user_id, category_id } = req.body;
			const checkedBody = z
				.object({
					user_id: z.string(),
					category_id: z.coerce.number(),
				})
				.parse({ user_id, category_id });

			const addedId = await addFileMetadata({
				path: req.file.path,
				originalname: req.file.originalname,
				user_id: checkedBody.user_id,
				category_id: checkedBody.category_id,
			});

			if (!addedId)
				throw new InternalServerError("Failed to add file metadata");

			const addedFile = await getFileMetadata({ id: addedId[0] });

			if (!addedFile)
				throw new InternalServerError("Failed to get file metadata");

			res.status(201).json(addedFile);
		} catch (error) {
			next(error);
		}
	}
);

export const uploadRoutes: Router = router;
