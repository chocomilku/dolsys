import { FileEdit } from "../../../../interfaces/File";
import { axiosWrapperWithAuthToken } from "./axiosWrapperWithAuthToken";


export const editFile = async (
	access_token: string,
	uid: string,
	updates: FileEdit
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
