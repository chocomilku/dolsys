import { NextFunction, Request, Response, Router } from "express";
import { upload } from "../../middleware/multer/upload";
import { addFileMetadata } from "../../controller/addFileMetadata";
import type { FileMetadataWithID } from "../../../interfaces/FileMetadata";
import { db } from "../../middleware/knex/credentials";

const router: Router = Router();

router.get("/", (req, res: Response, next) => {
	res.status(501).json({
		message: "hmmmge",
	});
});

router.post(
	"/",
	upload.single("file"),
	async (req: Request, res: Response, next: NextFunction) => {
		if (!req.file) return res.status(400).json({ message: "No file uploaded" });

		const addedId = await addFileMetadata({
			path: req.file.path,
			originalname: req.file.originalname,
		});

		if (!addedId) throw new Error("Failed to add file metadata");

		const addedFile = await db<FileMetadataWithID>("files").where({
			id: addedId[0],
		});

		res.status(201).json(addedFile[0]);
	}
);

export const uploadRoutes: Router = router;
