import { requiresAuth } from "express-openid-connect";
import { Router, Request, Response } from "express";

const router = Router();

router.get("/", requiresAuth(), (req: Request, res: Response) => {
	const userData = req.oidc.user;
	if (!userData) return res.status(500).send("No user data found");

	res.send("Hi " + userData.name + "!");
});

export const profileRoute: Router = router;
