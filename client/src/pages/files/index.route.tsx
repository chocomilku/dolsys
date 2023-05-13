import { Container, Flex, Heading, Kbd, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { FileUploader } from "react-drag-drop-files";

export const FileIndexPage = (): JSX.Element => {
	const [file, setFile] = useState<File>();
	const handleChange = (file: File) => {
		setFile(file);
		console.log(file);
	};
	return (
		<>
			<VStack as={Container} maxW="container.xl" p={8}>
				<Heading textAlign="center" pb={8}>
					Upload Files
				</Heading>

				<FileUploader
					handleChange={handleChange}
					name="file"
					multiple={false}
					required={true}
					// apperently, message after upload cannot be changed yet so lets wait for https://github.com/KarimMokhtar/react-drag-drop-files/pull/118 to be merged to be able to do update the text
				/>
				<Kbd>{JSON.stringify(file?.name)}</Kbd>
			</VStack>
		</>
	);
};
