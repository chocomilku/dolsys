import {
	Box,
	Button,
	Card,
	CardBody,
	CardHeader,
	Center,
	Container,
	Flex,
	Heading,
	Spacer,
	Text,
	VStack,
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

				<Box p={8}>
					<Heading textAlign={"center"} p={6}>
						About the Project + The team
					</Heading>
					<Center>
						<Card maxW={"lg"} w={"full"}>
							<CardHeader>
								<Heading as={"h2"} size="lg">
									Author
								</Heading>
							</CardHeader>
							<hr />
							<CardBody>
								<Text size="md">Things here</Text>
							</CardBody>
						</Card>
					</Center>
				</Box>

				<VStack p={8}>
					<Heading textAlign={"center"} p={6}>
						Inquries?
					</Heading>
					<Text>
						Contact us at <a>something here</a>
					</Text>
				</VStack>
			</Container>
		</>
	);
};
