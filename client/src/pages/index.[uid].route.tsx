import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { axiosWrapperWithAuthToken } from "../controllers/axios/axiosWrapperWithAuthToken";
import { useAuth0 } from "@auth0/auth0-react";
import { FilesWithCategoriesWithoutPathAndUserID } from "../../../interfaces/FileMetadata";

export const IndexUIDPage = (): JSX.Element => {
	const { uid } = useParams();
	const { getAccessTokenSilently } = useAuth0();
	const [fileMetadata, setFileMetadata] =
		useState<FilesWithCategoriesWithoutPathAndUserID>();

	useEffect(() => {
		const fetchFileMetadata = async () => {
			try {
				const access_token = await getAccessTokenSilently();
				const fetchFileMetadata =
					await axiosWrapperWithAuthToken<FilesWithCategoriesWithoutPathAndUserID>(
						access_token,
						{
							url: `/files/${uid}`,
							method: "GET",
						}
					);
				if (!fetchFileMetadata.data) return;
				setFileMetadata(fetchFileMetadata.data);
			} catch (error) {
				console.log(error);
			}
		};
		fetchFileMetadata();
	}, [getAccessTokenSilently, uid]);

	return (
		<h1>
			UID: <code>{uid}</code>
			<br />
			<code>{JSON.stringify(fileMetadata)}</code>
		</h1>
	);
};
