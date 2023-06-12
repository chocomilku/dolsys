import { AuthOptions } from "express-oauth2-jwt-bearer";
import { secrets } from "../secrets";

export const authOptions: AuthOptions = {
	audience: secrets.AUTH0_AUDIENCE,
	issuerBaseURL: secrets.ISSUER_BASE_URL,
	tokenSigningAlg: "RS256",
};
