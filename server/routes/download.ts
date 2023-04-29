import { Request, Response, Router } from "express";
import { db } from "../middleware/knex/credentials";
import { FileMetadataWithID } from "../../interfaces/FileMetadata";

const router = Router();

router.get("/:uid", async (req: Request, res: Response) => {
	const { uid } = req.params;

	const file = await db<FileMetadataWithID>("files").where({ uid });

	if (!file[0]) return res.status(404).json({ message: "File not found" });

	await db<FileMetadataWithID>("files")
		.where({ uid })
		.increment("downloadCount", 1);

	res.download(file[0].path, file[0].originalname);
});

export const dlRoutes: Router = router;
