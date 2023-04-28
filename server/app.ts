import express, { Application } from "express";
import cors from "cors";
import { routes } from "./routes";
import { handleErrors } from "./middleware/handleErrors";
import { auth } from "express-openid-connect";
import { auth as authorize } from "express-oauth2-jwt-bearer";
import { authConfig } from "./middleware/openid/authConfig";
import { authOptions } from "./middleware/jwt-bearer/authOptions";

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(auth(authConfig));
// app.use(authorize(authOptions));

app.use("/", routes);

app.use(handleErrors);

export default app;
