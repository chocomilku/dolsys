import { Request, Response, Router } from "express";
import { db } from "../middleware/knex/credentials";
import { FileMetadataWithID } from "../../interfaces/FileMetadata";
import { getFileMetadata } from "../controller/getFileMetadata";

const router = Router();

router.get("/:uid", async (req: Request, res: Response) => {
	const { uid } = req.params;

	const file = await getFileMetadata(uid);

	if (!file) return res.status(404).json({ message: "File not found" });

	await db<FileMetadataWithID>("files")
		.where({ uid })
		.increment("downloadCount", 1);

	return res.download(file.path, file.originalname);
});

export const dlRoutes: Router = router;
