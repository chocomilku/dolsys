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
  useColorMode,
  Slide,
  Fade,
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
import { AvatarWithPopover } from "./nav/AvatarWithPopover";
import Auth0LogButton from "./Auth0LogButton";

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
        shadow="md"
      >
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
                onClick={mobileNav.onToggle}
              />

              {/* faded black bg on the back that blocks touch behind while mobile nav is open */}
              <Fade
                in={mobileNav.isOpen}
                style={{
                  display: mobileNav.isOpen ? "block" : "none",
                }}
                unmountOnExit={true}
              >
                <span
                  style={{
                    width: "100%",
                    height: "100%",
                    background: "#232323",
                    opacity: "35%",
                    position: "absolute",
                    top: 0,
                    left: 0,
                  }}
                />
              </Fade>
              <Slide
                in={mobileNav.isOpen}
                direction="left"
                unmountOnExit={true}
                style={{
                  zIndex: 10,
                }}
              >
                <VStack
                  pos="absolute"
                  top={0}
                  left={0}
                  right={0}
                  display={mobileNav.isOpen ? "flex" : "none"}
                  flexDirection="column"
                  p={2}
                  pb={4}
                  my={"20"}
                  mx={2}
                  bg={bg}
                  spacing={3}
                  rounded="sm"
                  shadow="sm"
                  zIndex={10}
                >
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
                      isUserNotAllowed={navBarLink.isUserNotAllowed}
                    />
                  ))}
                </VStack>
              </Slide>
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
                  isUserNotAllowed={navBarLink.isUserNotAllowed}
                />
              ))}
            </HStack>
          </HStack>

          {/* Color switcher + login / avatar */}
          <HStack spacing={3} display="flex" alignItems="center">
            <Button
              onClick={toggleColorMode}
              p={3}
              color="gray.800"
              _dark={{ color: "inherit" }}
              rounded="lg"
              cursor="pointer"
              variant="outline"
            >
              {colorMode === "light" ? <MdLightMode /> : <MdDarkMode />}
              <VisuallyHidden>Toggle Light/Dark Mode</VisuallyHidden>
            </Button>

            {!user || !isAuthenticated ? (
              <Auth0LogButton label="Log In" type="login" icon={<CiLogin />} />
            ) : (
              <AvatarWithPopover user={user} />
            )}
          </HStack>
        </Flex>
      </chakra.header>
    </React.Fragment>
  );
};
export default NavBar;
