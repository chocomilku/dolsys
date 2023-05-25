import {
	Container,
	Flex,
	Grid,
	Heading,
	VStack,
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
import { FormEvent, useMemo, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { RxCopy } from "react-icons/rx";
import { uploadFile } from "../controllers/uploadFile";
import { Category } from "../../../interfaces/Categories";
import { FormCategoriesSelect } from "../components/form/FormCategoriesSelect";
import { FileUploadArea } from "../components/form/FileUploadArea";
import { FileName } from "../components/form/FileName";
import { FileUser } from "../components/form/FileUser";
import { FileUploadButton } from "../components/form/FileUploadButton";
import { FileDetail } from "../components/form/FileDetail";

export const UploadPage = (): JSX.Element => {
	const [file, setFile] = useState<File>();
	const [formData, setFormData] = useState({
		name: "",
		phase: "",
		unit: "",
	});
	const [isInputErrorEnabled, setInputErrorEnabled] = useState<boolean>(false);
	const [fileLink, setFileLink] = useState<string | null>(null);
	const [isUploading, setIsUploading] = useState<boolean>(false);

	const [selectedCategory, setSelectedCategory] = useState<Category | null>(
		null
	);

	const fileLinkUrl = useMemo(() => {
		if (!fileLink) return window.location.origin;
		return `${window.location.origin}/${fileLink}`;
	}, [fileLink]);

	const parsedSelectedCategoryId = useMemo(() => {
		if (!selectedCategory) return;

		const parsedId = selectedCategory.id;

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

	const handleCategoryChange = (category: Category | null) => {
		setSelectedCategory(category);
	};

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
		setFormData({ ...formData, [name]: value.trim() });
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
						<FileUploadArea file={file} handleFileChange={handleFileChange} />
						<Grid templateColumns={{ base: "1fr", md: "2fr 1fr" }} gap="0.5rem">
							<FileName fileName={file?.name} />
							<FileUser name={user?.name} picture={user?.picture} />
						</Grid>
						<FileDetail
							label="name"
							onChange={handleFormChange}
							value={formData.name}
							isRequired
							isValueInvalid={isNameEmpty && isInputErrorEnabled}
						/>
						<Flex gap="0.25rem" direction={{ base: "column", md: "row" }}>
							<FormCategoriesSelect
								isInputErrorEnabled={isInputErrorEnabled}
								onCategoryChange={handleCategoryChange}
								selectedCategory={selectedCategory}
							/>
							<FileDetail
								label="phase"
								onChange={handleFormChange}
								value={formData.phase}
								maxW={{ base: "100%", md: "100px" }}
							/>
							<FileDetail
								label="unit"
								onChange={handleFormChange}
								value={formData.unit}
								maxW={{ base: "100%", md: "100px" }}
							/>
						</Flex>
						<FileUploadButton isUploading={isUploading} />
					</Flex>
				</form>
			</VStack>
		</>
	);
};
