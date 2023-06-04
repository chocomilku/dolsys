import express, { Application } from "express";
import cors from "cors";
import helmet from "helmet";

import { routes } from "./routes";
import { handleErrors } from "./middleware/errors/handleErrors";
import morganMiddleware from "./middleware/morgan/morganLoggingMiddleware";
import path from "path";

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
app.use(morganMiddleware);

app.use("/api", routes);

if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "../server/public")));

	app.get("*", (req, res) => {
		res.sendFile(path.join(__dirname, "../server/public/index.html"));
	});
}


app.use(handleErrors);

export default app;
