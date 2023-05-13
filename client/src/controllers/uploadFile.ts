import type {
	FileMetadata,
	FileMetadataWithID,
} from "../../../interfaces/FileMetadata";
import { axiosWrapperWithAuthToken } from "./axios/axiosWrapperWithAuthToken";

export const uploadFile = async (
	access_token: string,
	file: File,
	metadata: Omit<FileMetadata, "uid" | "path" | "originalname">
) => {
	const formData = new FormData();
	formData.append("file", file);
	formData.append("user_id", metadata.user_id);
	formData.append("category_id", metadata.category_id.toString());
	formData.append("title", metadata.title ?? "");
	formData.append("phase_no", metadata.phase_no ?? "");
	formData.append("unit_no", metadata.unit_no ?? "");

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
