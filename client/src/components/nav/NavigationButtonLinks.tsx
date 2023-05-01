import { Button } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";

export interface NavLinkButtonProps {
	/**
	 * The path to navigate to
	 * @example `/admin`, `/`, `/profile`
	 */
	to: string;

	/**
	 * a react element to render as the left icon
	 */
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	leftIcon: React.ReactElement<any, string | React.JSXElementConstructor<any>>;

	/**
	 * The name of the path to be shown as label for the button
	 */
	pathName: string;

	/**
	 * Whether the button should take up the full width of the parent container
	 */
	fullWidth?: boolean;

	/**
	 * Whether the button should not be active if the path contains a substring of the current path (to)
	 * @example
	 * `false` => link will be active if the current path is `/admin` or `/admin/users`
	 * `true` => link will only be active if the current path is `/admin`
	 */
	end?: boolean;

	/**
	 * An optional onClick handler
	 */
	onClick?: React.MouseEventHandler<HTMLAnchorElement>;
}

export const NavigationButtonNavLinks = (props: NavLinkButtonProps) => {
	return (
		<NavLink
			to={props.to}
			style={{ width: "100%" }}
			end={props.end}
			onClick={props.onClick}>
			{({ isActive }) => {
				return (
					<Button
						w={props.fullWidth ? "full" : "auto"}
						variant={isActive ? "solid" : "ghost"}
						colorScheme="purple"
						leftIcon={props.leftIcon}
						size={props.fullWidth ? undefined : "sm"}
						shadow="xs">
						{props.pathName}
					</Button>
				);
			}}
		</NavLink>
	);
};
