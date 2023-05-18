import {
	Grid,
	GridItem,
	FormControl,
	Input,
	FormLabel,
	FormErrorMessage,
	Flex,
} from "@chakra-ui/react";
import { Select as ReactSelect } from "chakra-react-select";
import { useState } from "react";
import { BaseFormModal } from "./BaseFormModal";
import { FormCategoriesSelect } from "../form/FormCategoriesSelect";
import { ICategoryOptions } from "../../../../interfaces/Categories";

interface UpdateFormModalProps {
	isOpen: boolean;
	onClose: () => void;
	fileMeta: {
		id: number;
		originalname: string;
		title?: string;
	};
}

export const UpdateFormModal = (props: UpdateFormModalProps) => {
	const onSubmit = () => {
		console.log("Submit");
	};
	const [selectedCategory, setSelectedCategory] =
		useState<ICategoryOptions | null>(null);
	const handleCategoryChange = (category: ICategoryOptions | null) => {
		setSelectedCategory(category);
	};

	return (
		<>
			<BaseFormModal
				isOpen={props.isOpen}
				onClose={props.onClose}
				formData={{
					header: "Edit File Metadata",
					submit: {
						submitText: "Save",
						submitAction: () => onSubmit(),
					},
				}}>
				<Grid templateColumns={{ base: "1fr", md: "1fr 4fr" }} gap="0.5rem">
					<GridItem as={FormControl}>
						<FormLabel>ID:</FormLabel>
						<Input
							type="number"
							placeholder={"File ID"}
							isReadOnly
							isTruncated
							colorScheme="purple"
							value={props.fileMeta.id}
						/>
					</GridItem>
					<GridItem as={FormControl}>
						<FormLabel>originalname:</FormLabel>
						<Input
							type="text"
							placeholder={"File Name"}
							isReadOnly
							isTruncated
							colorScheme="purple"
						/>
					</GridItem>
				</Grid>
				<FormControl isInvalid={false} isRequired>
					<FormLabel>Name:</FormLabel>
					<Input
						type="text"
						placeholder="Name"
						name="name"
						required
						colorScheme="purple"
						// onChange={handleFormChange}
						value={props.fileMeta.title}
					/>
					<FormErrorMessage>Name should not be empty</FormErrorMessage>
				</FormControl>
				<Flex gap="0.25rem" direction={{ base: "column", md: "row" }}>
					<FormCategoriesSelect
						isInputErrorEnabled={true}
						onCategoryChange={handleCategoryChange}
						selectedCategory={selectedCategory}
					/>
					<FormControl maxW={{ base: "100%", md: "100px" }}>
						<FormLabel>Phase:</FormLabel>
						<Input
							type="text"
							placeholder="Phase"
							colorScheme="purple"
							name="phase"
							// onChange={handleFormChange}
							value={"phase"}
						/>
					</FormControl>
					<FormControl maxW={{ base: "100%", md: "100px" }}>
						<FormLabel>Unit:</FormLabel>
						<Input
							type="text"
							placeholder="Unit"
							colorScheme="purple"
							name="unit"
							// onChange={handleFormChange}
							value={"unit"}
						/>
					</FormControl>
				</Flex>
			</BaseFormModal>
		</>
	);
};
