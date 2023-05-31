import { Request, Response, Router } from "express";
import { db } from "../../middleware/knex/credentials";
import { getFileMetadata } from "../../controller/getFileMetadata";
import { NotFoundError } from "../../middleware/errors/errors";
import { File } from "../../../interfaces/File";

const router = Router();

router.get("/:uid/download", async (req: Request, res: Response) => {
	const { uid } = req.params;

	const file = await getFileMetadata({ uid });

	if (!file) throw new NotFoundError("File not found");

	await db<File>("files")
		.where({ uid })
		.increment("downloadCount", 1);

	return res.download(file.path, file.originalname);
});

export const dlRoute: Router = router;
