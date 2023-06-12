import { RequestHandler } from "express";
import { getFileMetadata } from "../../utils/getFileMetadata";
import { deleteFile } from "../../services/files/deleteFile.service";

export const deleteFileController: RequestHandler = async (req, res, next) => {
	try {
		const { uid } = req.params;

		const file = await getFileMetadata({ uid });

		await deleteFile(file.id, file.path);

		res.status(204).send();
	} catch (error) {
		next(error);
	}
};