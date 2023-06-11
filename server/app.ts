import express, { Application } from "express";
import cors from "cors";
import helmet from "helmet";
import { expressCspHeader, INLINE, NONE, SELF } from "express-csp-header"

import { routes } from "./routes";
import { handleErrors } from "./middleware/errors/handleErrors";
import morganMiddleware from "./middleware/morgan/morganLoggingMiddleware";
import path from "path";

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      ...helmet.contentSecurityPolicy.getDefaultDirectives(),
      'script-src': ["'self'", "'unsafe-eval'", "'unsafe-inline'"],
	'connectSrc': ["'self'", "dev--o07amtt.us.auth0.com"],
	'img-src': ["'self'", "googleusercontent.com"],
    }
  }
}));
app.use(morganMiddleware);

app.use("/api", routes);


app.use(express.static(path.join(__dirname, "../server/public")));

app.get("*", (req, res) => {
	// res.sendFile(path.join(__dirname, "../server/public/index.html"));
});



app.use(handleErrors);

export default app;
