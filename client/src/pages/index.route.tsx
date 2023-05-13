import {
	Button,
	Card,
	CardHeader,
	Container,
	Flex,
	Heading,
	Spacer,
} from "@chakra-ui/react";
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
			<Container maxW="container.xl">
				<Heading textAlign={"center"} p={6}>
					Why this that is this?
				</Heading>
				<Flex
					p={8}
					flexWrap={"wrap"}
					flexDirection={"row"}
					gap={"2rem"}
					alignContent={"center"}
					justifyContent={"center"}>
					<Card maxW={"lg"} w={"full"}>
						<CardHeader>
							<Heading as={"h2"} size="lg">
								Card
							</Heading>
						</CardHeader>
					</Card>
					<Card maxW={"lg"} w={"full"}>
						<CardHeader>
							<Heading as={"h2"} size="lg">
								Card
							</Heading>
						</CardHeader>
					</Card>
					<Card maxW={"lg"} w={"full"}>
						<CardHeader>
							<Heading as={"h2"} size="lg">
								Card
							</Heading>
						</CardHeader>
					</Card>
					<Card maxW={"lg"} w={"full"}>
						<CardHeader>
							<Heading as={"h2"} size="lg">
								Card
							</Heading>
						</CardHeader>
					</Card>
				</Flex>
			</Container>
		</>
	);
};
