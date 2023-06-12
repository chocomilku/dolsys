import { FileWithCategory } from "../../../interfaces/File";

export const removeFilesCredentials = (files: FileWithCategory[]) => files.map(file => {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const { path, user_id, ...fileWithoutPathAndUser } = file;

	return fileWithoutPathAndUser;
});