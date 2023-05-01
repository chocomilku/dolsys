import React from "react";

import {
	chakra,
	Box,
	Flex,
	useColorModeValue,
	VisuallyHidden,
	HStack,
	Button,
	useDisclosure,
	VStack,
	IconButton,
	CloseButton,
	Avatar,
	useColorMode,
} from "@chakra-ui/react";
import { Logo } from "./Logo";
import { AiOutlineMenu } from "react-icons/ai";
import { CiLogin } from "react-icons/ci";
import { MdLightMode, MdDarkMode } from "react-icons/md";
import { User } from "@auth0/auth0-react";
import {
	NavLinkButtonProps,
	NavigationButtonNavLinks,
} from "./nav/NavigationButtonLinks";
import { NavLink } from "react-router-dom";

interface NavBarProps {
	isAuthenticated: boolean;
	user?: User;
	navBarLinks: NavLinkButtonProps[];
}

const NavBar = ({ isAuthenticated, user, navBarLinks }: NavBarProps) => {
	const bg = useColorModeValue("white", "gray.800");
	const mobileNav = useDisclosure();
	const { toggleColorMode, colorMode } = useColorMode();

	return (
		<React.Fragment>
			<chakra.header
				bg={bg}
				w="full"
				px={{ base: 2, sm: 4 }}
				py={4}
				shadow="md">
				<Flex alignItems="center" justifyContent="space-between" mx="auto">
					<HStack display="flex" spacing={3} alignItems="center">
						{/* mobile nav */}
						<Box display={{ base: "inline-flex", md: "none" }}>
							<IconButton
								display={{ base: "flex", md: "none" }}
								aria-label="Open menu"
								fontSize="20px"
								color="gray.800"
								_dark={{ color: "inherit" }}
								variant="ghost"
								icon={<AiOutlineMenu />}
								onClick={mobileNav.onOpen}
							/>
							<VStack
								pos="absolute"
								top={0}
								left={0}
								right={0}
								display={mobileNav.isOpen ? "flex" : "none"}
								flexDirection="column"
								p={2}
								pb={4}
								m={2}
								bg={bg}
								spacing={3}
								rounded="sm"
								shadow="sm">
								<CloseButton
									aria-label="Close menu"
									justifySelf="self-start"
									onClick={mobileNav.onClose}
								/>
								{/* mobile nav navigation links */}
								{navBarLinks.map((navBarLink, i) => (
									<NavigationButtonNavLinks
										key={`mobileNav${i}-` + navBarLink.pathName}
										to={navBarLink.to}
										leftIcon={navBarLink.leftIcon}
										pathName={navBarLink.pathName}
										fullWidth
										onClick={mobileNav.onClose}
									/>
								))}
							</VStack>
						</Box>

						{/* logo */}
						<NavLink to="/" style={{ display: "flex", alignItems: "center" }}>
							<Logo />
						</NavLink>

						{/* desktop nav */}
						<HStack spacing={3} display={{ base: "none", md: "inline-flex" }}>
							{navBarLinks.map((navBarLink, i) => (
								<NavigationButtonNavLinks
									key={`desktopNav${i}-` + navBarLink.pathName}
									to={navBarLink.to}
									leftIcon={navBarLink.leftIcon}
									pathName={navBarLink.pathName}
								/>
							))}
						</HStack>
					</HStack>

					{/* Color switcher + login / avatar */}
					<HStack
						spacing={3}
						display={mobileNav.isOpen ? "none" : "flex"}
						alignItems="center">
						<Button
							onClick={toggleColorMode}
							p={3}
							color="gray.800"
							_dark={{ color: "inherit" }}
							rounded="lg"
							cursor="pointer"
							variant="outline">
							{colorMode === "light" ? <MdLightMode /> : <MdDarkMode />}
							<VisuallyHidden>Toggle Light/Dark Mode</VisuallyHidden>
						</Button>

						{!user || !isAuthenticated ? (
							<Button
								display={mobileNav.isOpen ? "none" : "flex"}
								colorScheme="purple"
								variant="outline"
								size="md"
								rightIcon={<CiLogin />}>
								Log In
							</Button>
						) : (
							<Avatar size="sm" name={user.name} src={user.picture} />
						)}
					</HStack>
				</Flex>
			</chakra.header>
		</React.Fragment>
	);
};
export default NavBar;
