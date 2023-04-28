import { Request, Response, Router } from "express";
import { authMiddleware } from "../middleware/jwt-bearer/authOptions";
import { requiredScopes } from "express-oauth2-jwt-bearer";

const router = Router();

router.get(
	"/",
	authMiddleware,
	requiredScopes("view:files"),
	(req: Request, res: Response) => {
		res.status(200).json({
			message: "Hello, world!",
		});
	}
);

export const indexRoute: Router = router;
