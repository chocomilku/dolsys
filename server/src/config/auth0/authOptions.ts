import { AuthOptions } from "express-oauth2-jwt-bearer";
import dotenv from "dotenv";
import path from "path";

dotenv.config(
	{ path: path.join(__dirname, "../../../.env") });

export const authOptions: AuthOptions = {
	audience: process.env.AUTH0_AUDIENCE,
	issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
	tokenSigningAlg: "RS256",
};
