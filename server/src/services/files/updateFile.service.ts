import { File, FileEdit } from "../../../../interfaces/File";
import { db } from "../../config/db";
import { InternalServerError } from "../../middleware/errors/errors";
import { getFileMetadata } from "../../utils/getFileMetadata";
import { validateFileUpdate } from "../../validators/fileUpdateValidator";

export const updateFile = async (uid: string, file: FileEdit) => {

	await getFileMetadata({ uid });
    
	const validatedFileUpdate = validateFileUpdate(file);

	const updateFile = await db<File>("files").where({ uid }).update(validatedFileUpdate);

	if (updateFile === 0) throw new InternalServerError("File was not updated");

	const updatedFile = await getFileMetadata({ uid });

	return updatedFile;
};