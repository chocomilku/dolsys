import { GridItem, FormControl, Input, FormLabel } from "@chakra-ui/react";

interface FileNameProps {
	fileName?: string;
}

export const FileName = (props: FileNameProps) => {
	return (
		<GridItem as={FormControl}>
			<FormLabel>File Name:</FormLabel>
			<Input
				type="text"
				placeholder={props.fileName ?? "File Name"}
				isReadOnly={true}
				isTruncated
				colorScheme="purple"
			/>
		</GridItem>
	);
};
