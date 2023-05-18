import {
	Grid,
	GridItem,
	FormControl,
	Input,
	FormLabel,
	FormErrorMessage,
	Flex,
} from "@chakra-ui/react";
import { Select } from "chakra-react-select";
import ReactSelect from "react-select";

// TODO: implement form functions here
export const FileForm = () => {
	return (
		<>
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
			<FormControl isInvalid={isNameEmpty && isInputErrorEnabled} isRequired>
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
					<FormErrorMessage>Category should not be empty</FormErrorMessage>
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
		</>
	);
};
