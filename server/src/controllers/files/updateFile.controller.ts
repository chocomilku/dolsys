import { RequestHandler } from "express";
import { updateFile } from "../../services/files/updateFile.service";

export const updateFileController: RequestHandler = async (req, res, next) => {
	try {
		const { uid } = req.params;
		const body = req.body;

		const updatedFile = await updateFile(uid, body);

		return res.status(200).json(updatedFile);
	} catch (error) {
		next(error);
	}
};