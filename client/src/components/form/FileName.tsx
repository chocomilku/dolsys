import { GridItem, FormControl, Input } from "@chakra-ui/react";

interface FileNameProps {
	fileName?: string;
}

export const FileName = (props: FileNameProps) => {
	return (
		<GridItem as={FormControl}>
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
