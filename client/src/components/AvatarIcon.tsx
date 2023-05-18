import { type User } from "@auth0/auth0-react";
import { Avatar, ResponsiveValue } from "@chakra-ui/react";
import { RxAvatar } from "react-icons/rx";

interface AvatarIconProps {
	user: User | undefined;
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
	if (!props.user) return <RxAvatar />;
	return (
		<Avatar
			size={props.size ?? "xs"}
			src={props.user?.picture}
			name={props.user.name ?? "User"}
		/>
	);
};
