import { db } from "../../config/db";
import { File } from "../../../../interfaces/File";

export const incrementDownloadCount = async (uid: string) => {
	await db<File>("files")
		.where({ uid })
		.increment("download_count", 1);
};