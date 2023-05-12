import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { axiosWrapperWithAuthToken } from "../controllers/axios/axiosWrapperWithAuthToken";
import { useAuth0 } from "@auth0/auth0-react";
import { FilesWithCategoriesWithoutPathAndUserID } from "../../../interfaces/FileMetadata";
import { axiosWrapper } from "../controllers/axios/axiosWrapper";

export const IndexUIDPage = (): JSX.Element => {
	const { uid } = useParams();
	const { getAccessTokenSilently } = useAuth0();
	const [fileMetadata, setFileMetadata] =
		useState<FilesWithCategoriesWithoutPathAndUserID>();

	useEffect(() => {
		const downloadFileAndFetchMetadata = async () => {
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

				const downloadFile = await axiosWrapper<File>({
					url: `/files/${uid}/download`,
					method: "GET",
				});
				console.log(downloadFile);

				if (!fetchFileMetadata.data) return;
				if (!downloadFile.data) return;

				setFileMetadata(fetchFileMetadata.data);

				const url = window.URL.createObjectURL(new Blob([downloadFile.data]));
				const link = document.createElement("a");
				link.href = url;
				link.setAttribute("download", fetchFileMetadata.data.originalname);
				document.body.appendChild(link);
				link.click();
				link.parentNode?.removeChild(link);
			} catch (error) {
				console.log(error);
			}
		};
		downloadFileAndFetchMetadata();
	}, [getAccessTokenSilently, uid]);

	return (
		<>
			<h1>Thank you for downloading!</h1>
			<hr />
			<h3>{fileMetadata?.name}</h3>
			<kbd>{fileMetadata?.code}</kbd>
			<p>Downloads: {fileMetadata?.downloadCount}</p>
		</>
	);
};
