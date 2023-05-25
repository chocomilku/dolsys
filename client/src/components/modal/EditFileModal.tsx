import {
	Code,
	FormControl,
	FormLabel,
	Grid,
	GridItem,
	Input,
} from "@chakra-ui/react";
import { FilesWithCategoriesWithoutPathAndUserID } from "../../../../interfaces/FileMetadata";
import { BaseFormModal } from "./BaseFormModal";
import { FileName } from "../form/FileName";
import { FileDetail } from "../form/FileDetail";
import { FormCategoriesSelect } from "../form/FormCategoriesSelect";
import { FormEvent, useEffect, useState } from "react";
import { ICategoryOptions } from "../../../../interfaces/Categories";

interface EditFileModalProps {
	isOpen: boolean;
	onClose: () => void;
	file: FilesWithCategoriesWithoutPathAndUserID | undefined;
}

export const EditFileModal = (props: EditFileModalProps) => {
	const [fileMetadata, setFileMetadata] = useState<
		FilesWithCategoriesWithoutPathAndUserID | undefined
	>();

	// REFACTOR: This should be changed on `fileMetadata` state, not a separate state
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
			name: props.file.name ?? "",
			phase: props.file.phase_no ?? "",
			unit: props.file.unit_no ?? "",
		});
	}, [props.file]);

	const [selectedCategory, setSelectedCategory] =
		useState<ICategoryOptions | null>(null);

	const handleCategoryChange = (category: ICategoryOptions | null) => {
		setSelectedCategory(category);
	};

	const handleFormChange = (event: FormEvent<HTMLInputElement>) => {
		const { name, value } = event.currentTarget;
		setFormData({ ...formData, [name]: value.trim() });
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
							submitAction: () => console.log("hi"),
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

							<FileName fileName={fileMetadata.originalname} />
						</Grid>
						<FileDetail
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
								<FileDetail
									label="phase"
									onChange={handleFormChange}
									value={formData.phase}
								/>
							</GridItem>
							<GridItem>
								<FileDetail
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
