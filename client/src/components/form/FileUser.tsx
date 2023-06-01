import { GridItem, FormControl, Select, FormLabel } from "@chakra-ui/react";
import { AvatarIcon } from "../AvatarIcon";

interface FileUserProps {
	name?: string;
	picture?: string;
}

export const FileUser = (props: FileUserProps) => {
	return (
		<GridItem as={FormControl}>
			<FormLabel>
				User:
			</FormLabel>
			<Select
				isReadOnly
				placeholder={props.name ?? "User"}
				icon={<AvatarIcon name={props.name} picture={props.picture} />}
				colorScheme="purple"
			/>
		</GridItem>
	);
};
