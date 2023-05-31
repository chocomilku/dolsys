import { db } from "../middleware/knex/credentials";
import * as nanoid from "nanoid";
import { BadRequestError } from "../middleware/errors/errors";
import { FileUpload, FileUploadWithUid, File } from "../../interfaces/File";
import { Category } from "../../interfaces/Category";

const UID_LENGTH = 10;

export const addFileMetadata = async (file: FileUpload) => {
	if (!file.category_id)
		throw new BadRequestError("Category ID is not defined");

	// this is the implementation of referential integrity on application level because PlanetScale doesn't support foreign keys
	const isCategoryIdValid = await validateCategoryId(file.category_id);

	if (!isCategoryIdValid) throw new BadRequestError("Category ID is not valid");

	const generateAndCheckUIDCollision = async () => {
		const uid = generateUID(UID_LENGTH);

		if (await isUIDConflicting(uid)) await generateAndCheckUIDCollision();

		return uid;
	};

	const finalizedFile: FileUploadWithUid = {
		...file,
		uid: await generateAndCheckUIDCollision(),
	};
	const response = await db("files").insert(finalizedFile);
	return response;
};

const generateUID = (length: number) => {
	return nanoid.nanoid(length);
};

const isUIDConflicting = async (uid: string) => {
	const files = await db<File>("files").where({ uid: uid });
	return files.length > 0;
};

const validateCategoryId = async (categoryId: number) => {
	const categories = await db<Category>("categories").where({
		id: categoryId,
	});
	return categories.length > 0;
};
