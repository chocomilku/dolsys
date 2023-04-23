import { db } from "../middleware/knex/credentials";
import * as nanoid from "nanoid";
import type {
	FileMetadata,
	FileMetadataWithID,
} from "../../interfaces/FileMetadata";

const UID_LENGTH = 10;

export const addFileMetadata = async (file: FileMetadata) => {
	const generateAndCheckUIDCollision = async () => {
		const uid = generateUID(UID_LENGTH);

		if (await isUIDConflicting(uid)) await generateAndCheckUIDCollision();

		return uid;
	};

	file.uid = await generateAndCheckUIDCollision();
	const response = await db("files").insert(file);
	return response;
};

const generateUID = (length: number) => {
	return nanoid.nanoid(length);
};

const isUIDConflicting = async (uid: string) => {
	const files = await db<FileMetadataWithID>("files").where({ uid: uid });
	return files.length > 0;
};
