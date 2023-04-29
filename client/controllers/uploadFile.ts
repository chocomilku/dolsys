import type { FileMetadataWithID } from "../../interfaces/FileMetadata";
import { axiosWrapperWithAuthToken } from "./axios/axiosWrapperWithAuthToken";

export const uploadFile = async (
	access_token: string,
	file: File,
	user_id: string
) => {
	const formData = new FormData();
	formData.append("file", file);
	formData.append("user_id", user_id);

	const uploadFile = await axiosWrapperWithAuthToken<FileMetadataWithID>(
		access_token,
		{
			method: "POST",
			url: "/upload",
			data: formData,
			headers: {
				"Content-Type": "multipart/form-data",
			},
		}
	);

	return uploadFile;
};
