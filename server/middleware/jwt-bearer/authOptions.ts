import { AuthOptions } from "express-oauth2-jwt-bearer";
import { auth } from "express-oauth2-jwt-bearer";
import dotenv from "dotenv";
import path from "path";

dotenv.config(
	process.env.NODE_ENV != "production" ? { path: path.join(__dirname, "../../.env") } :{});

const authOptions: AuthOptions = {
	audience: process.env.AUTH0_AUDIENCE,
	issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
	tokenSigningAlg: "RS256",
};

export const authMiddleware = auth(authOptions);
