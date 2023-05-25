import { Router } from "express";
import { getFilesMetadata } from "../../controller/getFileMetadata";
import { authMiddleware } from "../../middleware/jwt-bearer/authOptions";
import { checkRequiredPermissions } from "../../middleware/auth0/checkPermissions";
import {
	BadRequestError,
	InternalServerError,
} from "../../middleware/errors/errors";
import { db } from "../../middleware/knex/credentials";

const router: Router = Router();

router.get(
	"/",
	authMiddleware,
	checkRequiredPermissions(["view:files"]),
	async (req, res, next) => {
		try {
			const { page = "1", limit = "10" } = req.query;
			const [parsedPage, parsedLimit] = [
				parseInt(page.toString()),
				parseInt(limit.toString()),
			];

			if (isNaN(parsedPage)) throw new BadRequestError("Invalid page number");
			if (isNaN(parsedLimit)) throw new BadRequestError("Invalid limit number");

			if (parsedPage < 1) throw new BadRequestError("Invalid page number");
			if (parsedLimit < 1) throw new BadRequestError("Invalid limit number");

			const offset = (parsedPage - 1) * parsedLimit;

			if (isNaN(offset)) throw new BadRequestError("Invalid offset");
			if (offset < 0) throw new BadRequestError("Invalid offset");

			const files = await getFilesMetadata({
				limit: parsedLimit,
				offset,
			});

			const totalItems = await db("files_with_categories")
				.count({ count: "*" })
				.first();

			if (!totalItems || !totalItems.count)
				throw new InternalServerError("Could not count files");
			if (typeof totalItems.count === "string")
				throw new InternalServerError("Could not count files");

			const pagination = {
				totalItems: totalItems.count,
				currentPage: parsedPage,
				limit: parsedLimit,
				totalPages: Math.ceil(totalItems.count / parsedLimit),
			};

			const filesWithoutPathAndUser = files.map((file) => {
				// eslint-disable-next-line @typescript-eslint/no-unused-vars
				const { path, user_id, ...fileWithoutPathAndUser } = file;
				return fileWithoutPathAndUser;
			});

			return res
				.status(200)
				.json({ files: filesWithoutPathAndUser, pagination });
		} catch (error) {
			next(error);
		}
	}
);

export const listFilesMetadata: Router = router;
