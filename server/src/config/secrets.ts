import { cleanEnv, url, str } from "envalid";
import path from "path";
import dotenv from "dotenv";

const PATH = path.join(process.cwd(), "../.env");
dotenv.config({path: PATH});

export const secrets = cleanEnv(process.env, {
	DB_URL: url(),
	DB_DB: str(),
	BASE_URL: url(),
	ISSUER_BASE_URL: url(),
	AUTH0_AUDIENCE: str(),
});