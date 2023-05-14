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

		const filesWithoutPathAndUser = files.map((file) => {
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			const { path, user_id, ...fileWithoutPathAndUser } = file;
			return fileWithoutPathAndUser;
		});

		return res.status(200).json(filesWithoutPathAndUser);
	}
);

export const listFilesMetadata: Router = router;
