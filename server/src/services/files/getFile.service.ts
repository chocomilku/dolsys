import { FileWithCategory } from "../../../../interfaces/File";
import { getFileMetadata } from "../../utils/getFileMetadata";
import { removeFilesCredentials } from "../../utils/removeFilesCredentials";

export const getFile = async (specificParams: Partial<FileWithCategory>) => {
	const file = await getFileMetadata(specificParams);
	const [strippedFile] = removeFilesCredentials([file]);
	return strippedFile;
};