import { Router } from "express";
import { updateFileMetadata } from "../../controller/updateFileMetadata";
import { z } from "zod";
import { db } from "../../middleware/knex/credentials";
import { NotFoundError } from "../../middleware/errors/errors";
import { authMiddleware } from "../../middleware/jwt-bearer/authOptions";
import { checkRequiredPermissions } from "../../middleware/auth0/checkPermissions";
import { File, FileEdit } from "../../../interfaces/File";
import { TypedRequestBody } from "../../interfaces/typedExpress";

const router = Router();

router.put(
	"/:uid",
	authMiddleware,
	checkRequiredPermissions(["edit:files"]),
	async (req: TypedRequestBody<FileEdit>, res, next) => {
		try {
			const { uid } = req.params;

			const checkFile = await db<File>("files")
				.where({ uid })
				.first();

			if (!checkFile) throw new NotFoundError("File not found");

			const reqFileBody = req.body;
			const checkedBody = z
				.object({
					file_name: z.string(),
					category_id: z.number(),
					title: z.string().optional(),
					phase_no: z.string().optional(),
					unit_no: z.string().optional(),
				})
				.parse({
					file_name: reqFileBody.file_name,
					category_id: reqFileBody.category_id,
					title: reqFileBody.title,
					phase_no: reqFileBody.phase_no,
					unit_no: reqFileBody.unit_no,
				});

			await updateFileMetadata(uid, checkedBody);

			res.status(204);
		} catch (error) {
			next(error);
		}
	}
);

export const updateRoute = router;
