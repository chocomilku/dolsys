import { Router } from "express";
import { getFileMetadata } from "../../controller/getFileMetadata";
import { NotFoundError } from "../../middleware/errors/errors";
import { deleteFile } from "../../controller/deleteFile";
import { authMiddleware } from "../../middleware/jwt-bearer/authOptions";
import { checkRequiredPermissions } from "../../middleware/auth0/checkPermissions";

const router: Router = Router();

router.delete(
	"/:uid",
	authMiddleware,
	checkRequiredPermissions(["remove:files"]),
	async (req, res, next) => {
		try {
			const { uid } = req.params;

			const file = await getFileMetadata({ uid });

			if (!file) throw new NotFoundError("File not found");

			await deleteFile(file.id, file.path);

			res.status(204);
		} catch (error) {
			next(error);
		}
	}
);

export const deleteFileRoute: Router = router;
