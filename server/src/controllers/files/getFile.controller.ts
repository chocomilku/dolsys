import { RequestHandler } from "express";
import { getFile } from "../../services/files/getFile.service";

export const getFileController: RequestHandler = async (req, res, next) => {
	try {
		const { uid } = req.params;

		const file = await getFile({ uid });

		return res.status(200).json(file);
        
	} catch (error) {
		next(error);
	}
};