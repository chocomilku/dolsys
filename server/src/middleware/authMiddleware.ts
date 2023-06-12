import { auth } from "express-oauth2-jwt-bearer";
import { authOptions } from "../config/auth0/authOptions";

export const authMiddleware = auth(authOptions);