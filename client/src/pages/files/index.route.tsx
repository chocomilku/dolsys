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
	Alert,
	AlertDescription,
	AlertIcon,
	AlertTitle,
	Link,
	useClipboard,
	useToast,
	Code,
} from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { Select as ReactSelect } from "chakra-react-select";
import { FormEvent, useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import { type User, useAuth0 } from "@auth0/auth0-react";
import { RxAvatar, RxCopy } from "react-icons/rx";
import { BsCheckSquare, BsCloudUpload } from "react-icons/bs";
import { uploadFile } from "../../controllers/uploadFile";

export const FileIndexPage = (): JSX.Element => {
	const [file, setFile] = useState<File>();
	const [fileLink, setFileLink] = useState<string | null>(null);
	const [isUploading, setIsUploading] = useState<boolean>(false);
	const { user, getAccessTokenSilently } = useAuth0();
	const toast = useToast();

	const fileLinkUrl = `${window.location.origin}/${fileLink}`;
	const { onCopy } = useClipboard(fileLinkUrl ?? "");

	const handleFileChange = (file: File) => {
		toast({
			title: "File queued to be uploaded",
			description: <Code>{file.name}</Code>,
			status: "info",
			duration: 5000,
			isClosable: true,
			position: "top-right",
		});
		setFile(file);
	};

	const handleCopy = () => {
		onCopy();
		toast({
			title: "Copied to clipboard",
			description: "You can now share the link to anyone!",
			status: "success",
			duration: 5000,
			isClosable: true,
			position: "top-right",
		});
	};

	const handleFileUpload = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setIsUploading(true);
		toast({
			title: "File uploading",
			description: "Please wait while we upload your file",
			status: "info",
			duration: 5000,
			isClosable: true,
			position: "top-right",
		});
		const access_token = await getAccessTokenSilently();
		if (!user) return;
		if (!user.sub) return;
		if (!file) return;

		const response = await uploadFile(access_token, file, user.sub, 1);

		if (!response.data) return;
		setIsUploading(false);
		setFileLink(response.data.uid);
		toast({
			title: "File uploaded!",
			description: (
				<>
					Your file has been uploaded successfully. Access it at:
					<br />
					<Link href={fileLinkUrl} isExternal color="purple.700">
						{fileLinkUrl} <ExternalLinkIcon mx="2px" />
					</Link>
				</>
			),
			status: "success",
			duration: 10000,
			isClosable: true,
			position: "top-right",
		});
	};

	return (
		<>
			{fileLink && (
				<Alert
					status="success"
					variant="subtle"
					flexDirection="column"
					alignItems="center"
					justifyContent="center"
					textAlign="center"
					height="200px">
					<AlertIcon boxSize="40px" mr={0} />
					<AlertTitle mt={4} mb={1} fontSize="lg">
						File Uploaded!
					</AlertTitle>
					<AlertDescription maxWidth="sm">
						Your file has been uploaded successfully. You can download it at{" "}
						<Link href={`/${fileLink}`} color="purple.500" isExternal>
							{fileLinkUrl} <ExternalLinkIcon mx="2px" />
						</Link>
						<Icon
							as={RxCopy}
							onClick={handleCopy}
							boxSize="1.1rem"
							cursor="pointer"
							display="inline-block"
						/>
						.
					</AlertDescription>
				</Alert>
			)}

			<VStack as={Container} maxW="container.md" p={{ base: 4, md: 8 }}>
				<Heading textAlign="center" pb={8}>
					Upload Files
				</Heading>

				<form onSubmit={handleFileUpload}>
					<Flex direction={"column"} w={{ base: "100%", md: "xl" }} gap="1rem">
						<FileUploader
							handleChange={handleFileChange}
							name="file"
							multiple={false}
							required={true}>
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
						<Grid templateColumns={{ base: "1fr", md: "2fr 1fr" }} gap="0.5rem">
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
						<Flex gap="0.25rem" direction={{ base: "column", md: "row" }}>
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
							<FormControl maxW={{ base: "100%", md: "100px" }}>
								<Input type="text" placeholder="Phase" colorScheme="purple" />
							</FormControl>
							<FormControl maxW={{ base: "100%", md: "100px" }}>
								<Input type="text" placeholder="Unit" colorScheme="purple" />
							</FormControl>
						</Flex>
						<Button
							type="submit"
							variant={"solid"}
							colorScheme="purple"
							size={"lg"}
							w={{ base: "100%", md: "md" }}
							alignSelf={"center"}
							isLoading={isUploading}
							loadingText="Uploading">
							Upload
						</Button>
					</Flex>
				</form>
			</VStack>
		</>
	);
};

const AvatarIcon = ({ user }: { user: User | undefined }): JSX.Element => {
	if (!user) return <RxAvatar />;
	return <Avatar size="xs" src={user?.picture} name={user.name ?? "User"} />;
};
