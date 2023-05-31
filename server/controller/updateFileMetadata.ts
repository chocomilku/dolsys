import { File, FileEdit } from "../../interfaces/File";
import {
	InternalServerError,
	NotFoundError,
} from "../middleware/errors/errors";
import { db } from "../middleware/knex/credentials";


export const updateFileMetadata = async (
	uid: string,
	file: FileEdit
) => {
	const checkFile = await db<File>("files")
		.where({ uid })
		.first();

	if (!checkFile) throw new NotFoundError("File not found");

	// TODO: form validation using zod

	const updateFile = await db<File>("files")
		.where({ uid })
		.update({
			file_name: file.file_name,
			category_id: file.category_id,
			title: file.title,
			phase_no: file.phase_no,
			unit_no: file.unit_no,
		});

	if (!updateFile)
		throw new InternalServerError("Failed to update file metadata");
};
