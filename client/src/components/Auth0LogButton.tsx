import { Button, LayoutProps } from "@chakra-ui/react";
import { useAuth0 } from "@auth0/auth0-react";

interface LoginButtonProps {
	w?: LayoutProps["w"];
	onClick?: React.MouseEventHandler<HTMLButtonElement>;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	icon?: React.ReactElement<any, string | React.JSXElementConstructor<any>>;
	label: string;
	type: "login" | "logout";
}

const Auth0LogButton = (props: LoginButtonProps) => {
	const { loginWithRedirect, logout } = useAuth0();
	const auth0LogEventSelector = (type: LoginButtonProps["type"]) => {
		return () => {
			if (type === "login") {
				loginWithRedirect();
			} else {
				logout();
			}
		};
	};

	return (
		<Button
			display="flex"
			colorScheme="purple"
			variant="outline"
			size="md"
			w={props.w}
			rightIcon={props.icon}
			onClick={(event) => {
				props.onClick && props.onClick(event);
				auth0LogEventSelector(props.type)();
			}}>
			{props.label}
		</Button>
	);
};

export default Auth0LogButton;
