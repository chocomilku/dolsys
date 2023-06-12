import { RequestHandler } from "express";
import { BadRequestError } from "../../middleware/errors/errors";
import { validateFileUpload } from "../../validators/fileUploadValidator";
import { uploadFile } from "../../services/files/uploadFile.service";

export const uploadFileController: RequestHandler = async (req, res, next) => {
	try {
		if (!req.file) throw new BadRequestError("No file was uploaded");
		const file = req.file;
		const body = validateFileUpload(req.body);

		const uploadedFile = await uploadFile({path: file.path, file_name: file.originalname, ...body});

		return res.status(201).json(uploadedFile);
	} catch (error) {
		next(error);
	}
};