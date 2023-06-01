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
import { FileUpload } from "../../interfaces/File";

const router: Router = Router();

router.post(
	"/",
	upload.single("file"),
	authMiddleware,
	checkRequiredPermissions(["upload:files"]),
	async (
		req: TypedRequestBody<Partial<FileUpload>>,
		res: Response,
		next: NextFunction
	) => {
		try {
			if (!req.file) throw new BadRequestError("No file was uploaded");

			const uploadedFileFormBody = req.body;
			const checkedBody = z
				.object({
					user_id: z.string(),
					category_id: z.coerce.number(),
					title: z
						.string()
						.optional()
						.transform((value) => (value === "" ? undefined : value)),
					phase_no: z
						.string()
						.optional()
						.transform((value) => (value === "" ? undefined : value)),
					unit_no: z
						.string()
						.optional()
						.transform((value) => (value === "" ? undefined : value)),
				})
				.parse({
					user_id: uploadedFileFormBody.user_id,
					category_id: uploadedFileFormBody.category_id,
					title: uploadedFileFormBody.title,
					phase_no: uploadedFileFormBody.phase_no,
					unit_no: uploadedFileFormBody.unit_no,
				});

			const addedId = await addFileMetadata({
				path: req.file.path,
				file_name: req.file.originalname,
				user_id: checkedBody.user_id,
				category_id: checkedBody.category_id,
				phase_no: checkedBody.phase_no,
				unit_no: checkedBody.unit_no,
				title: checkedBody.title,
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
