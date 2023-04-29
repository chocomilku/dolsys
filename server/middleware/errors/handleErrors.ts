import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { UnauthorizedError } from "express-oauth2-jwt-bearer";
import { HTTPError } from "./errors";

export const handleErrors: ErrorRequestHandler = (
	err: Error,
	_req: Request,
	res: Response,
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	next: NextFunction
) => {
	console.error(err.stack);
	if (err instanceof UnauthorizedError || err instanceof HTTPError) {
		return res.status(err.status).json({
			error: err.message,
		});
	}
	return res.status(500).json({
		error: "Something went wrong",
	});
};
