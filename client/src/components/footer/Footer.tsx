import { Box, chakra, Flex, Text } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import { Logo } from "../Logo";
import { BsFacebook, BsGithub } from "react-icons/bs";
import { VERSION } from "../../../../utils/version";

const Footer = () => {
  return (
    <Flex
      w="full"
      bg="#edf3f8"
      _dark={{ bg: "#3e3e3e" }}
      alignItems="center"
      justifyContent="center"
      shadow="md"
    >
      <Flex
        w="full"
        as="footer"
        flexDir={{ base: "column", sm: "row" }}
        align="center"
        justify="space-around"
        bg="white"
        _dark={{
          bg: "gray.800",
        }}
        py={{ base: "8", sm: "10" }}
      >
        <NavLink to="/">
          <Logo />
        </NavLink>

        <Box textAlign="center">
          <chakra.p color="gray.800" _dark={{ color: "white" }}>
            All rights reserved. &copy; chocomilku 2023
          </chakra.p>
          <Text fontSize="3xs" fontFamily="monospace">
            DOLSYS: {VERSION.app} Client: {VERSION.client} Server:{" "}
            {VERSION.server}
          </Text>
        </Box>

        <Flex mx="-2">
          <chakra.a
            href="#"
            mx="2"
            color="gray.600"
            _dark={{ color: "gray.300", _hover: { color: "gray.400" } }}
            _hover={{
              color: "gray.500",
            }}
            aria-label="Facebook"
          >
            <BsFacebook />
          </chakra.a>

          <chakra.a
            href="#"
            mx="2"
            color="gray.600"
            _dark={{ color: "gray.300", _hover: { color: "gray.400" } }}
            _hover={{
              color: "gray.500",
            }}
            aria-label="Github"
          >
            <BsGithub />
          </chakra.a>
        </Flex>
      </Flex>
    </Flex>
  );
};
export default Footer;
