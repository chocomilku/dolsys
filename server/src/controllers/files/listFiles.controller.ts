import { RequestHandler } from "express";
import { pagination } from "../../utils/pagination";
import { listFiles } from "../../services/files/listFiles.service";
import { countData } from "../../utils/countData";
import { removeFilesCredentials } from "../../utils/removeFilesCredentials";

export const listFilesController: RequestHandler = async (req, res, next) => {
	try {
		const { page: queryPage, limit: queryLimit } = req.query as {
            page: string;
            limit: string;
        };

		const { limit, offset, page } = pagination(queryPage, queryLimit);

		const files = await listFiles(offset, limit);
		const totalItems = await countData("files_with_categories");

		const paginationData = {
			totalItems,
			currentPage: page,
			limit,
			totalPages: Math.ceil(totalItems / limit),
		};

		const strippedFiles = removeFilesCredentials(files);

		return res.status(200).json({ files: strippedFiles, pagination: paginationData });
	} catch (error) {
		next(error);
	}
};