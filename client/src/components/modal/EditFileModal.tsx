import {
	Code,
	FormControl,
	FormLabel,
	Grid,
	GridItem,
	Input,
	useToast,
} from "@chakra-ui/react";
import { BaseFormModal } from "./BaseFormModal";
import { FileName } from "../form/FileName";
import { FormDetail } from "../form/FormDetail";
import { FormCategoriesSelect } from "../form/FormCategoriesSelect";
import { FormEvent, useEffect, useState } from "react";
import { CategoryOption } from "../../../../interfaces/Category";
import { useAuth0 } from "@auth0/auth0-react";
import { editFile } from "../../controllers/axios/editFile";
import { FileMetadata } from "../../../../interfaces/File";

interface EditFileModalProps {
	isOpen: boolean;
	onClose: () => void;
	file: FileMetadata | undefined;
}

export const EditFileModal = (props: EditFileModalProps) => {
	const { getAccessTokenSilently } = useAuth0();
	const toast = useToast();
	const [fileMetadata, setFileMetadata] = useState<
		FileMetadata | undefined
	>();

	const [formData, setFormData] = useState({
		name: "",
		phase: "",
		unit: "",
	});

	useEffect(() => {
		if (!props.file) return setFileMetadata(undefined);

		return setFileMetadata(props.file);
	}, [props.file]);

	useEffect(() => {
		if (!props.file) return setFormData({ name: "", phase: "", unit: "" });

		return setFormData({
			name: props.file.title ?? "",
			phase: props.file.phase_no ?? "",
			unit: props.file.unit_no ?? "",
		});
	}, [props.file]);

	const [selectedCategory, setSelectedCategory] = useState<CategoryOption | null>(
		null
	);

	const handleCategoryChange = (category: CategoryOption | null) => {
		setSelectedCategory(category);
	};

	const handleFormChange = (event: FormEvent<HTMLInputElement>) => {
		const { name, value } = event.currentTarget;
		setFormData({ ...formData, [name]: value.trim() });
	};

	const submitEdits = async () => {
		if (!fileMetadata) return;
		if (!selectedCategory) return;
		const response = await editFile(
			await getAccessTokenSilently(),
			fileMetadata.uid,
			{
				file_name: formData.name,
				phase_no: formData.phase,
				unit_no: formData.unit,
				category_id: selectedCategory?.id,
			}
		);
		if (!response) return;

		toast({
			title: "File Updated!",
			description: "File metadata has been updated.",
			status: "success",
			duration: 10000,
			isClosable: true,
			position: "top-right",
		});
		props.onClose();
	};

	return (
		<>
			{!fileMetadata ? (
				// Modal if data is not available
				<BaseFormModal
					isOpen={props.isOpen}
					onClose={props.onClose}
					formData={{
						header: "Edit File Metadata",
					}}>
					<Code colorScheme="red">
						Error fetching file data. Please try again later.
					</Code>
				</BaseFormModal>
			) : (
				<>
					<BaseFormModal
						isOpen={props.isOpen}
						onClose={props.onClose}
						size={"xl"}
						formData={{
							header: "Edit File Metadata",
							submitText: "Save",
							submitAction: () => submitEdits(),
						}}>
						<Grid templateColumns={{ base: "1fr", md: "1fr 8fr" }} gap="0.5rem">
							<GridItem as={FormControl}>
								<FormLabel>ID:</FormLabel>
								<Input
									type="number"
									placeholder={"File ID"}
									isReadOnly
									isTruncated
									colorScheme="purple"
									value={fileMetadata.id}
								/>
							</GridItem>

							<FileName fileName={fileMetadata.file_name} />
						</Grid>
						<FormDetail
							label="name"
							maxW={"full"}
							onChange={handleFormChange}
							value={formData.name}
						/>
						<Grid
							templateColumns={{ base: "1fr", md: "2fr 1fr 1fr" }}
							gap="0.5rem">
							<GridItem>
								<FormCategoriesSelect
									isInputErrorEnabled={false}
									onCategoryChange={handleCategoryChange}
									selectedCategory={selectedCategory}
									preSelectedCategoryId={fileMetadata.category_id}
								/>
							</GridItem>
							<GridItem>
								<FormDetail
									label="phase"
									onChange={handleFormChange}
									value={formData.phase}
								/>
							</GridItem>
							<GridItem>
								<FormDetail
									label="unit"
									onChange={handleFormChange}
									value={formData.unit}
								/>
							</GridItem>
						</Grid>
					</BaseFormModal>
				</>
			)}
		</>
	);
};
