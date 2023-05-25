import { FileMetadataWithID } from "../../../../interfaces/FileMetadata";
import { axiosWrapperWithAuthToken } from "./axiosWrapperWithAuthToken";

type UpdateFileMetadata = Pick<
	FileMetadataWithID,
	"originalname" | "category_id" | "title" | "phase_no" | "unit_no"
>;

export const editFile = async (
	access_token: string,
	uid: string,
	updates: UpdateFileMetadata
) => {
	try {
		const updateFile = await axiosWrapperWithAuthToken<Record<string, never>>(
			access_token,
			{
				method: "PUT",
				url: `/files/${uid}`,
				data: updates,
			}
		);

		if (!updateFile) return;

		return updateFile;
	} catch (error) {
		console.log(error);
	}
};
