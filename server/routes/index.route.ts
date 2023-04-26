import { Request, Response, Router } from "express";

const router = Router();

router.get("/", (req: Request, res: Response) => {
	res.send(req.oidc.isAuthenticated() ? "Logged in" : "Logged out");
});

export const indexRoute: Router = router;
