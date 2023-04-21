import express, { Application } from "express";
import { routes } from "./routes";
import { handleErrors } from "./middleware/handleErrors";

const app: Application = express();

app.use(express.json());

app.use("/", routes);

app.use(handleErrors);

export default app;
