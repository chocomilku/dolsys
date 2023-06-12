const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 10;

export function pagination(page: number, limit: number): { offset: number, limit: number, page: number };
export function pagination(page: string, limit: string): { offset: number, limit: number, page: number };
export function pagination(page?: string | number, limit?: string | number): { offset: number, limit: number, page: number } {
	let parsedPage = page ? (typeof page === "string" ? parseInt(page, 10) : page) : DEFAULT_PAGE;
	let parsedLimit = limit ? (typeof limit === "string" ? parseInt(limit, 10) : limit) : DEFAULT_LIMIT;

	if (isNaN(parsedPage) || parsedPage < 1) {
		parsedPage = DEFAULT_PAGE;
	}

	if (isNaN(parsedLimit) || parsedLimit < 1) {
		parsedLimit = DEFAULT_LIMIT;
	}

	const offset = (parsedPage - 1) * parsedLimit;

	if (isNaN(offset) || offset < 0) {
		throw new Error("Invalid offset value");
	}

	return { offset, limit: parsedLimit, page: parsedPage };
}