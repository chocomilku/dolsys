class HTTPError extends Error {
	status!: number;
	constructor(message: string) {
		super(message);
		this.message = message;
	}
}

class BadRequestError extends HTTPError {
	constructor(message = "Bad Request") {
		super(message);
		this.status = 400;
	}
}

class UnauthorizedError extends HTTPError {
	constructor(message = "Unauthorized") {
		super(message);
		this.status = 401;
	}
}

class ForbiddenError extends HTTPError {
	constructor(message = "Forbidden") {
		super(message);
		this.status = 403;
	}
}

class NotFoundError extends HTTPError {
	constructor(message = "Not Found") {
		super(message);
		this.status = 404;
	}
}

class InternalServerError extends HTTPError {
	constructor(message = "Internal Server Error") {
		super(message);
		this.status = 500;
	}
}

export {
	HTTPError,
	BadRequestError,
	UnauthorizedError,
	ForbiddenError,
	NotFoundError,
	InternalServerError,
};
