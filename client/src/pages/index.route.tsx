import {
  Box,
  Button,
  Container,
  Grid,
  GridItem,
  Heading,
  Text,
  chakra,
} from "@chakra-ui/react";
import "../styles/home.css";
import { VscGithub } from "react-icons/vsc";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

export const IndexPage = (): JSX.Element => {
  const { isAuthenticated, loginWithRedirect } = useAuth0();
  const navigate = useNavigate();

  return (
    <>
      <Box width="100%" className="hero spacer">
        <Container maxW="container.xl">
          <Grid
            templateRows="1fr 1fr"
            placeItems="center"
            gap={{ base: "1rem", md: "3rem" }}
          >
            <GridItem m="1.25rem">
              <Heading
                fontSize={{ base: "4xl", md: "7xl" }}
                className="hero-header"
                overflowWrap="break-word"
              >
                The
                <chakra.span
                  fontSize={{ base: "4xl", md: "7xl" }}
                  textColor="purple.100"
                  className="hero-header"
                >
                  Fastest
                </chakra.span>
                way to disseminate learning materials
              </Heading>
            </GridItem>
            <GridItem>
              <Button
                size="lg"
                w={{ base: "xs", md: "lg" }}
                height="4rem"
                colorScheme="gray"
                variant="solid"
                _hover={{ bg: "purple.200" }}
                border={"3px solid #2D3748"}
                onClick={() => {
                  isAuthenticated ? navigate("/upload") : loginWithRedirect();
                }}
              >
                {isAuthenticated ? "Go to Upload" : "Log in to get started"}
              </Button>
            </GridItem>
          </Grid>
        </Container>
      </Box>
      {/* Implementation too hard while in time constraints just skip and enter next update */}
      {/* <Box className="middle spacer" p="1rem">
        <Flex direction="column" justifyContent="center" alignContent="center">
          <Heading fontSize="6xl" textColor="white" textAlign="center">
            Why DOLSYS?
          </Heading>
          <Flex>
            <Box background="red.100" p="1rem">
              <Flex
                direction="column"
                justifyContent="center"
                alignContent="center"
              >
                <Icon as={ImDatabase} w="24" h="24" />
                <Heading>Centralized Solution</Heading>
                <Text>No more hassle on which service you uploaded it</Text>
              </Flex>
            </Box>
          </Flex>
        </Flex>
      </Box> */}

      <Box className="bottom spacer">
        <Container maxW="container.lg">
          <Grid
            placeItems="center"
            py="2rem"
            gap={{ base: "1rem", md: "3rem" }}
          >
            <GridItem>
              <Heading fontSize="5xl" textColor="white">
                What is DOLSYS?
              </Heading>
            </GridItem>
            <GridItem px="3rem">
              <Text
                textColor="white"
                fontSize="2xl"
                fontWeight="bold"
                textAlign="center"
              >
                DOLSYS came from an analogy of Dolphins (Students) are swimming
                in the vast sea (information). Dolsys was built as an output for
                a research subject that aims to be implemented school-wide.
                DOLSYS was built around Typescript. React for the frontend,
                Express for the Backend, and MySQL for the Database. Hosted in
                DigitalOcean while experiencing, Github's Student Developer
                Pack. This project was fun to build and i hope that this will
                get positive feedbacks.
              </Text>
            </GridItem>
            <GridItem>
              <Button
                variant="solid"
                size="lg"
                rightIcon={<VscGithub />}
                colorScheme="purple"
                onClick={() =>
                  (window.location.href =
                    "https://github.com/chocomilku/dolsys")
                }
              >
                Github Repository
              </Button>
            </GridItem>
          </Grid>
        </Container>
      </Box>
    </>
  );
};
