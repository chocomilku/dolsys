import { Request, Response, Router } from "express";
import { authMiddleware } from "../middleware/jwt-bearer/authOptions";
import { checkRequiredPermissions } from "../middleware/auth0/checkPermissions";

const router = Router();

router.get(
	"/",
	authMiddleware,
	checkRequiredPermissions(["view:files"]),
	(req: Request, res: Response) => {
		res.status(200).json({
			message: "Hello, world!",
		});
	}
);

export const indexRoute: Router = router;
