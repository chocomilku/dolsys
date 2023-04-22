import { NextFunction, Request, Response, Router } from "express";
import multer from "multer";
import path from "path";

const router: Router = Router();

const upload = multer({ dest: "../uploads" });

router.get("/", (req, res: Response, next) => {
	res.status(501).json({
		message: "hmmmge",
	});
});

router.post(
	"/",
	upload.single("file"),
	async (req: Request, res: Response, next: NextFunction) => {
		res.status(201).json({
			path: req.file?.path,
			originalFile: req.file?.originalname,
		});
	}
);

export const uploadRoutes: Router = router;
