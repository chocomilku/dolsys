import { z } from "zod";
import { FileUpload } from "../../../interfaces/File";

const fileUploadValidatorSchema = z
	.object({
		user_id: z.string(),
		category_id: z.coerce.number(),
		title: z
			.string()
			.optional()
			.transform((value) => (value === "" ? undefined : value)),
		phase_no: z
			.string()
			.optional()
			.transform((value) => (value === "" ? undefined : value)),
		unit_no: z
			.string()
			.optional()
			.transform((value) => (value === "" ? undefined : value)),
	});

export const validateFileUpload = (file: FileUpload) => {
	const parsedFile = fileUploadValidatorSchema.parse(file);
	return parsedFile;
};