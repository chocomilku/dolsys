import { ErrorRequestHandler, Request, Response, NextFunction } from "express";

export const handleErrors: ErrorRequestHandler = (
	err: Error,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	console.error(err.stack);
	res.status(500).json({
		error: err.message,
	});
};
