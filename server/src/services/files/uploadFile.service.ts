import { Category } from "../../../../interfaces/Category";
import { FileUpload, File, FileUploadWithUid } from "../../../../interfaces/File";
import { db } from "../../config/db";
import * as nanoid from "nanoid";
import { BadRequestError } from "../../middleware/errors/errors";
import { getFileMetadata } from "../../utils/getFileMetadata";

const UID_LENGTH = 10;

export const uploadFile = async (file: FileUpload) => {

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
	const [addedFileID] = await db("files").insert(finalizedFile);
	
	const addedFile = await getFileMetadata({ id: addedFileID });
	return addedFile;
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