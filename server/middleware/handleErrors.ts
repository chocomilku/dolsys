import { ErrorRequestHandler, Request, Response } from "express";

export const handleErrors: ErrorRequestHandler = (
	err: Error,
	_req: Request,
	res: Response
) => {
	console.error(err.stack);
	res.status(500).json({
		error: "Something went wrong",
	});
};
