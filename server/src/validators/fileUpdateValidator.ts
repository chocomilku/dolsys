import { z } from "zod";
import { FileEdit } from "../../../interfaces/File";

const fileUpdateValidatorSchema = z
	.object({
		category_id: z.number(),
		title: z.string().optional(),
		phase_no: z.string().optional(),
		unit_no: z.string().optional(),
	});

export const validateFileUpdate = (file: FileEdit) => {
	const parsedFile = fileUpdateValidatorSchema.parse(file);
	return parsedFile;
};