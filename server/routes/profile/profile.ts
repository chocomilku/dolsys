import { requiresAuth } from "express-openid-connect";
import { Router, Request, Response } from "express";

const router = Router();

router.get(
	"/",
	requiresAuth(() => false),
	(req: Request, res: Response) => {
		const userData = req.oidc.user;
		if (!userData)
			return res.status(403).json({
				message: "Not Authenticated",
			});

		res.status(200).json(userData);
	}
);

export const profileRoute: Router = router;
