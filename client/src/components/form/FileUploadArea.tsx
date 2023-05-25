import { Flex, Icon, Text } from "@chakra-ui/react";
import { FileUploader } from "react-drag-drop-files";
import { BsCloudUpload, BsCheckSquare } from "react-icons/bs";

interface FileUploadAreaProps {
	file: File | undefined;
	handleFileChange: (file: File) => void;
}

export const FileUploadArea = (props: FileUploadAreaProps) => {
	return (
		<>
			<FileUploader
				handleChange={props.handleFileChange}
				name="file"
				multiple={false}
				required={true}>
				<Flex
					w="full"
					borderColor={"purple.500"}
					borderStyle={"dashed"}
					borderWidth={"3px"}
					p={16}
					alignItems={"center"}
					justifyContent={"center"}
					flexDirection={"column"}
					cursor={"pointer"}
					gap="1rem">
					<Icon
						boxSize={"5em"}
						as={!props.file ? BsCloudUpload : BsCheckSquare}
					/>
					<Text fontSize={"xl"}>
						{!props.file
							? "Drop your file or click here"
							: "Uploaded Successfully"}
					</Text>
				</Flex>
			</FileUploader>
		</>
	);
};
