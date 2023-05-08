import { Router } from "express";
import { getFileMetadata } from "../../controller/getFileMetadata";
import { NotFoundError } from "../../middleware/errors/errors";

const router: Router = Router();

router.get("/:uid", async (req, res) => {
	const { uid } = req.params;

	const file = await getFileMetadata({ uid });

	if (!file) throw new NotFoundError("File not found");

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const { path, ...fileWithoutPath } = file;

	return res.status(200).json(fileWithoutPath);
});

export const fileMetadata: Router = router;
