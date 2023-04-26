import { ConfigParams } from "express-openid-connect";

export const authConfig: ConfigParams = {
	authRequired: false,
	auth0Logout: true,
	secret: process.env.AUTH0_SECRET,
	baseURL: process.env.BASE_URL,
	clientID: process.env.CLIENT_ID,
	issuerBaseURL: process.env.ISSUER_BASE_URL,
};
