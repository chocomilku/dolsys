import {
	Avatar,
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
	FormErrorMessage,
	FormLabel,
} from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { Select as ReactSelect } from "chakra-react-select";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import { type User, useAuth0 } from "@auth0/auth0-react";
import { RxAvatar, RxCopy } from "react-icons/rx";
import { BsCheckSquare, BsCloudUpload } from "react-icons/bs";
import { uploadFile } from "../../controllers/uploadFile";
import { Categories } from "../../../../interfaces/Categories";
import { axiosWrapper } from "../../controllers/axios/axiosWrapper";

interface ICategoryOptions {
	value: string;
	label: string;
}

export const FileIndexPage = (): JSX.Element => {
	const [file, setFile] = useState<File>();
	const [formData, setFormData] = useState({
		name: "",
		phase: "",
		unit: "",
	});
	const [isInputErrorEnabled, setInputErrorEnabled] = useState<boolean>(false);
	const [fileLink, setFileLink] = useState<string | null>(null);
	const [isUploading, setIsUploading] = useState<boolean>(false);
	const [categoryOptions, setCategoryOptions] = useState<ICategoryOptions[]>(
		[]
	);
	const [selectedCategory, setSelectedCategory] =
		useState<ICategoryOptions | null>(null);

	const fileLinkUrl = useMemo(() => {
		if (!fileLink) return window.location.origin;
		return `${window.location.origin}/${fileLink}`;
	}, [fileLink]);

	const parsedSelectedCategoryId = useMemo(() => {
		if (!selectedCategory) return;

		const parsedId = parseInt(selectedCategory?.value.split("-")[0]);

		if (isNaN(parsedId)) return;

		return parsedId;
	}, [selectedCategory]);

	const isCategoryEmpty = selectedCategory === null;
	const isNameEmpty = formData.name === "";

	const { user, getAccessTokenSilently } = useAuth0();
	const toast = useToast();
	const { onCopy } = useClipboard(fileLinkUrl ?? "");

	const resetForm = () => {
		setFile(undefined);
		setInputErrorEnabled(false);
		setFormData({
			name: "",
			phase: "",
			unit: "",
		});
	};

	useEffect(() => {
		const fetchCategoryOptions = async () => {
			const categories = await axiosWrapper<Categories[]>({
				url: "/categories",
				method: "GET",
			});
			if (!categories.data) return;
			const options: ICategoryOptions[] = categories.data.map((category) => {
				return {
					value: `${category.id}${category.code && `-${category.code}`}`,
					label: category.name,
				};
			});
			setCategoryOptions(options);
		};
		fetchCategoryOptions();
	}, []);

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

	const handleFormChange = (event: FormEvent<HTMLInputElement>) => {
		const { name, value } = event.currentTarget;
		setFormData({ ...formData, [name]: value });
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
		setInputErrorEnabled(true);
		setIsUploading(true);

		if (isNameEmpty || isCategoryEmpty) {
			setIsUploading(false);
			toast({
				title: "Form not completed correctly",
				description: "Please complete the form",
				status: "error",
				duration: 5000,
				isClosable: true,
				position: "top-right",
			});
		}

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
		if (!parsedSelectedCategoryId) return;

		const response = await uploadFile(access_token, file, {
			user_id: user.sub,
			category_id: parsedSelectedCategoryId,
			title: formData.name,
			phase_no: formData.phase,
			unit_no: formData.unit,
		});

		if (!response.data) return;
		setIsUploading(false);
		setFileLink(response.data.uid);
		toast({
			title: "File uploaded!",
			description: (
				<>
					Your file has been uploaded successfully. Access it at:
					<br />
					<Link href={`/${response.data.uid}`} isExternal color="purple.700">
						{`${window.location.origin}/${response.data.uid}`}
						<ExternalLinkIcon mx="2px" />
					</Link>
				</>
			),
			status: "success",
			duration: 10000,
			isClosable: true,
			position: "top-right",
		});
		resetForm();
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
						<FormControl
							isInvalid={isNameEmpty && isInputErrorEnabled}
							isRequired>
							<FormLabel>Name:</FormLabel>
							<Input
								type="text"
								placeholder="Name"
								name="name"
								required
								colorScheme="purple"
								onChange={handleFormChange}
								value={formData.name}
							/>
							<FormErrorMessage>Name should not be empty</FormErrorMessage>
						</FormControl>
						<Flex gap="0.25rem" direction={{ base: "column", md: "row" }}>
							<FormControl
								w={"full"}
								isRequired
								isInvalid={isCategoryEmpty && isInputErrorEnabled}>
								<FormLabel>Category</FormLabel>
								<ReactSelect
									onChange={(value) => setSelectedCategory(value)}
									options={categoryOptions}
									colorScheme="purple"
									required
									value={selectedCategory}
								/>
								<FormErrorMessage>
									Category should not be empty
								</FormErrorMessage>
							</FormControl>
							<FormControl maxW={{ base: "100%", md: "100px" }}>
								<FormLabel>Phase:</FormLabel>
								<Input
									type="text"
									placeholder="Phase"
									colorScheme="purple"
									name="phase"
									onChange={handleFormChange}
									value={formData.phase}
								/>
							</FormControl>
							<FormControl maxW={{ base: "100%", md: "100px" }}>
								<FormLabel>Unit:</FormLabel>
								<Input
									type="text"
									placeholder="Unit"
									colorScheme="purple"
									name="unit"
									onChange={handleFormChange}
									value={formData.unit}
								/>
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
