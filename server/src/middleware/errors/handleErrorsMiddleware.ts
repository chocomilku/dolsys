import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { UnauthorizedError } from "express-oauth2-jwt-bearer";
import { HTTPError } from "./errors";
import { ZodError } from "zod";

export const handleErrors: ErrorRequestHandler = (
	err: Error,
	_req: Request,
	res: Response,
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	_next: NextFunction
) => {
	console.error(err.stack);

	if (err instanceof ZodError) {
		res.status(400).json({
			error: err.errors,
		});
	} else if (err instanceof UnauthorizedError) {
		res.status(err.status).json({
			error: err.message,
		});
	} else if (err instanceof HTTPError) {
		res.status(err.status).json({
			error: err.message,
		});
	}
	else {
		res.status(500).json({
			error: err.message || "Something went wrong",
		});
	}

};
