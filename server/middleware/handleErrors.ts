import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { UnauthorizedError } from "express-oauth2-jwt-bearer";

export const handleErrors: ErrorRequestHandler = (
	err: Error,
	_req: Request,
	res: Response,
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	next: NextFunction
) => {
	console.error(err.stack);
	if (err instanceof UnauthorizedError) {
		return res.status(err.statusCode).json({
			error: err.message,
		});
	}
	res.status(500).json({
		error: "Something went wrong",
	});
};
