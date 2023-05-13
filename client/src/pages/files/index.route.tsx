import {
	Button,
	Container,
	FormControl,
	FormLabel,
	Heading,
	Kbd,
	Stack,
	VStack,
} from "@chakra-ui/react";
import Select from "react-select";
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

				<form>
					<FileUploader
						handleChange={handleChange}
						name="file"
						multiple={false}
						required={true}
						// apperently, message after upload cannot be changed yet so lets wait for https://github.com/KarimMokhtar/react-drag-drop-files/pull/118 to be merged to be able to do update the text
					/>
					<Stack direction={"row"}>
						<FormControl>
							<FormLabel>File name:</FormLabel>
							<input type="text" />
						</FormControl>
						<FormControl>
							<FormLabel>User:</FormLabel>
							<input type="text" />
						</FormControl>
					</Stack>

					<FormControl>
						<FormLabel>Name:</FormLabel>
						<input type="text" />
					</FormControl>

					<Stack direction={"row"}>
						<Select
							options={[
								{ value: "chocolate", label: "Chocolate" },
								{ value: "strawberry", label: "Strawberry" },
								{ value: "vanilla", label: "Vanilla" },
							]}
						/>

						<FormControl>
							<FormLabel>Phase:</FormLabel>
							<input type="text" />
						</FormControl>

						<FormControl>
							<FormLabel>Unit:</FormLabel>
							<input type="text" />
						</FormControl>
					</Stack>
				</form>
				<Button>Upload</Button>
			</VStack>
		</>
	);
};
