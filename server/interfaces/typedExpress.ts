import { Send, Query } from "express-serve-static-core";
import { Response, Request } from "express";

export interface TypedResponse<ResBody> extends Response {
	json: Send<ResBody, this>;
}

export interface TypedRequestBody<T> extends Request {
	body: T;
}

export interface TypedRequestQuery<T extends Query> extends Request {
	query: T;
}

export interface TypedRequest<T extends Query, U> extends Request {
	body: U;
	query: T;
}
