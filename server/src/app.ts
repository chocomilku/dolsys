import express, { Application } from "express";
import cors from "cors";
import helmet from "helmet";

import { routes } from "./routes";
import { handleErrors } from "./middleware/errors/handleErrorsMiddleware";
import morganMiddleware from "./middleware/loggingMiddleware";

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet({
	contentSecurityPolicy: {
		directives: {
			...helmet.contentSecurityPolicy.getDefaultDirectives(),
			"script-src": ["'self'", "'unsafe-eval'", "'unsafe-inline'"],
			"connectSrc": ["'self'", "dev--o07amtt.us.auth0.com"],
			"img-src": ["'self'", "googleusercontent.com"],
		}
	}
}));
app.use(morganMiddleware);

app.use("/api", routes);

app.use(handleErrors);

export default app;
