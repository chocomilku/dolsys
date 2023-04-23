import { Request, Response, NextFunction, Router } from "express";
import { db } from "../../middleware/knex/credentials";
import { FileMetadataWithID } from "../../../interfaces/FileMetadata";

const router = Router();

router.get("/:uid", async (req, res, next) => {
	const { uid } = req.params;

	const file = await db<FileMetadataWithID>("files").where({ uid });

	if (!file[0]) return res.status(404).json({ message: "File not found" });

	const increment = await db<FileMetadataWithID>("files")
		.where({ uid })
		.increment("downloadCount", 1);
	console.log(increment);

	res.download(file[0].path, file[0].originalname);
});

export const dlRoutes: Router = router;
