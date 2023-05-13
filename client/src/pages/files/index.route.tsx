import {
	Avatar,
	Box,
	Button,
	Container,
	Flex,
	FormControl,
	Grid,
	GridItem,
	Heading,
	Input,
	Select,
	VStack,
	Text,
	Icon,
} from "@chakra-ui/react";
import { Select as ReactSelect } from "chakra-react-select";
import { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import { type User, useAuth0 } from "@auth0/auth0-react";
import { RxAvatar } from "react-icons/rx";
import { BsCheckSquare, BsCloudUpload } from "react-icons/bs";

export const FileIndexPage = (): JSX.Element => {
	const [file, setFile] = useState<File>();
	const { user } = useAuth0();
	const handleChange = (file: File) => {
		setFile(file);
		console.log(file);
	};
	return (
		<>
			<VStack as={Container} maxW="container.xl" p={8}>
				<Heading textAlign="center" pb={8}>
					Upload Files
				</Heading>

				<Flex as={"form"} direction={"column"} w={"xl"} gap="1rem">
					<FileUploader
						handleChange={handleChange}
						name="file"
						multiple={false}
						required={true}
						// apperently, message after upload cannot be changed yet so lets wait for https://github.com/KarimMokhtar/react-drag-drop-files/pull/118 to be merged to be able to do update the text
					>
						<Flex
							w="full"
							borderColor={"purple.500"}
							borderStyle={"dashed"}
							borderWidth={"3px"}
							p={16}
							alignItems={"center"}
							justifyContent={"center"}
							flexDirection={"column"}
							cursor={"pointer"}
							gap="1rem">
							<Icon
								boxSize={"5em"}
								as={!file ? BsCloudUpload : BsCheckSquare}
							/>
							<Text fontSize={"xl"}>
								{!file
									? "Drop your file or click here"
									: "Uploaded Successfully"}
							</Text>
						</Flex>
					</FileUploader>

					<Grid templateColumns={"2fr 1fr"} gap="0.5rem">
						<GridItem as={FormControl}>
							<Input
								type="text"
								placeholder={file?.name ?? "File Name"}
								isReadOnly
								isTruncated
								colorScheme="purple"
							/>
						</GridItem>
						<GridItem as={FormControl}>
							<Select
								isReadOnly
								placeholder={user?.name ?? "User"}
								icon={<AvatarIcon user={user} />}
								colorScheme="purple"
							/>
						</GridItem>
					</Grid>

					<FormControl>
						<Input
							type="text"
							placeholder="Name"
							required
							colorScheme="purple"
						/>
					</FormControl>

					<Flex gap="0.25rem">
						<Box w={"full"}>
							<ReactSelect
								required
								options={[
									{ value: "chocolate", label: "Chocolate" },
									{ value: "strawberry", label: "Strawberry" },
									{ value: "vanilla", label: "Vanilla" },
								]}
								colorScheme="purple"
							/>
						</Box>

						<FormControl maxW={"100px"}>
							<Input type="text" placeholder="Phase" colorScheme="purple" />
						</FormControl>

						<FormControl maxW={"100px"}>
							<Input type="text" placeholder="Unit" colorScheme="purple" />
						</FormControl>
					</Flex>
				</Flex>
				<Button
					variant={"solid"}
					colorScheme="purple"
					size={"lg"}
					w={{ base: "sm", md: "lg" }}>
					Upload
				</Button>
			</VStack>
		</>
	);
};

const AvatarIcon = ({ user }: { user: User | undefined }): JSX.Element => {
	if (!user) return <RxAvatar />;
	return <Avatar size="xs" src={user?.picture} name={user.name ?? "User"} />;
};
