import { AuthOptions } from "express-oauth2-jwt-bearer";

export const authOptions: AuthOptions = {
	audience: process.env.AUTH0_AUDIENCE,
	issuer: process.env.AUTH0_ISSUER,
	tokenSigningAlg: "RS256",
};
