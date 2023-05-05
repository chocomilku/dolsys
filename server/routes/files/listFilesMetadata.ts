import { Router } from "express";
import { getFilesMetadata } from "../../controller/getFileMetadata";
import { authMiddleware } from "../../middleware/jwt-bearer/authOptions";
import { checkRequiredPermissions } from "../../middleware/auth0/checkPermissions";

const router: Router = Router();

router.get(
	"/",
	authMiddleware,
	checkRequiredPermissions(["view:files"]),
	async (req, res) => {
		const files = await getFilesMetadata();

		return res.status(200).json(files);
	}
);

export const listFilesMetadata: Router = router;
