import { Request, Response, Router } from "express";
import path from "path";

const router = Router();

router.get("/", (req: Request, res: Response) => {
	res.sendFile("index.html", { root: path.join(__dirname, "../../public") });
});

export const indexRoute: Router = router;
