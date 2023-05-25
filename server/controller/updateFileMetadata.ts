import { type FileMetadataWithID } from "../../interfaces/FileMetadata";
import {
	InternalServerError,
	NotFoundError,
} from "../middleware/errors/errors";
import { db } from "../middleware/knex/credentials";

type UpdateFileMetadata = Pick<
	FileMetadataWithID,
	"originalname" | "category_id" | "title" | "phase_no" | "unit_no"
>;

export const updateFileMetadata = async (
	uid: string,
	file: UpdateFileMetadata
) => {
	const checkFile = await db<FileMetadataWithID>("files")
		.where({ uid })
		.first();

	if (!checkFile) throw new NotFoundError("File not found");

	// TODO: form validation using zod

	const updateFile = await db<FileMetadataWithID>("files")
		.where({ uid })
		.update({
			originalname: file.originalname,
			category_id: file.category_id,
			title: file.title,
			phase_no: file.phase_no,
			unit_no: file.unit_no,
		});

	if (!updateFile)
		throw new InternalServerError("Failed to update file metadata");
};
