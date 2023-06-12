import { RequestHandler } from "express";
import { incrementDownloadCount } from "../../services/files/downloadFile.service";
import { getFileMetadata } from "../../utils/getFileMetadata";

export const downloadFileController: RequestHandler = async (req, res, next) => {
	try {
		const { uid } = req.params;
    
		const file = await getFileMetadata({uid});
		await incrementDownloadCount(uid);
    
		return res.download(file.path, file.file_name);
	} catch (error) {
		next(error);
	}
};