import { Avatar, ResponsiveValue } from "@chakra-ui/react";
import { RxAvatar } from "react-icons/rx";

interface AvatarIconProps {
	picture?: string;
	name?: string;
	size?: ResponsiveValue<
		| (string & object)
		| "xs"
		| "sm"
		| "md"
		| "lg"
		| "xl"
		| "2xl"
		| "2xs"
		| "full"
	>;
}

export const AvatarIcon = (props: AvatarIconProps): JSX.Element => {
	if (!props.picture && !props.name) return <RxAvatar />;
	return (
		<Avatar
			size={props.size ?? "xs"}
			src={props.picture}
			name={props.name ?? "User"}
		/>
	);
};
