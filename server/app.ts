import express, { Application } from "express";
import cors from "cors";
import helmet from "helmet";

import { routes } from "./routes";
import { handleErrors } from "./middleware/errors/handleErrors";

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());

app.use("/", routes);

app.use(handleErrors);

export default app;
