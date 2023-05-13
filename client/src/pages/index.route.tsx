import { Button, Container, Flex, Heading, Spacer } from "@chakra-ui/react";
import HeroBg from "../../assets/hero-bg.svg";

export const IndexPage = (): JSX.Element => {
	return (
		<>
			<Flex
				alignItems="center"
				justifyContent="center"
				flexDirection="column"
				p={20}
				style={{
					background: `url(${HeroBg})`,
					width: "100%",
					height: "calc(35vh + 12rem)",
					backgroundSize: "cover",
					backgroundRepeat: "no-repeat",
				}}>
				<Heading as={"h2"} size="4xl" textColor={"purple.900"}>
					some text here 🚀
				</Heading>
				<Spacer />
				<Button size="lg" w={{ base: "xs", md: "lg" }}>
					Log In
				</Button>
			</Flex>
			<Container maxW="container.xl">a</Container>
		</>
	);
};
