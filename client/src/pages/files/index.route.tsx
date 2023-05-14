import {
	Box,
	Card,
	CardBody,
	CardFooter,
	CardHeader,
	Code,
	Container,
	Heading,
	IconButton,
	Stack,
	VStack,
	Text,
} from "@chakra-ui/react";
import { FiDelete } from "react-icons/fi";
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
				<Stack direction="column" spacing="4">
					{filesList.map((file, index) => {
						return (
							<>
								<Box
									key={index}
									display="flex"
									alignItems="center"
									justifyContent="space-between"
									p={2}
									borderWidth={1}
									borderRadius="md">
									<Text>{file.originalname}</Text>
									<IconButton
										icon={<FiDelete />}
										variant="ghost"
										colorScheme="red"
										onClick={() => console.log("e")}
										aria-label="Delete file"
									/>
								</Box>
							</>
						);
					})}
				</Stack>
			</VStack>
		</>
	);
};
