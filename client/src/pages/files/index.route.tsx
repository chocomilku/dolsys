import { Code, Container, Heading, VStack } from "@chakra-ui/react";
import { FilesWithCategoriesWithoutPathAndUserID } from "../../../../interfaces/FileMetadata";
import { useEffect, useState } from "react";
import { axiosWrapperWithAuthToken } from "../../controllers/axios/axiosWrapperWithAuthToken";
import { useAuth0 } from "@auth0/auth0-react";

export const FilesIndexPage = (): JSX.Element => {
	const [filesList, setFilesList] = useState<
		FilesWithCategoriesWithoutPathAndUserID[]
	>([]);
	const { getAccessTokenSilently } = useAuth0();
	useEffect(() => {
		const fetchFilesList = async () => {
			const access_token = await getAccessTokenSilently();

			const response = await axiosWrapperWithAuthToken<
				FilesWithCategoriesWithoutPathAndUserID[]
			>(access_token, {
				method: "GET",
				url: "/files",
			});

			if (!response.data) return;
			setFilesList(response.data);
		};
		fetchFilesList();
	}, [getAccessTokenSilently]);

	return (
		<>
			<VStack as={Container} maxW="container.lg" p={{ base: 4, md: 8 }}>
				<Heading textAlign="center" pb={8}>
					Files
				</Heading>
				<Code>{JSON.stringify(filesList)}</Code>
			</VStack>
		</>
	);
};
