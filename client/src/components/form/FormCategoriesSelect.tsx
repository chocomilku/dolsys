import { FormControl, FormErrorMessage, FormLabel } from "@chakra-ui/react";
import { Select as ReactSelect } from "chakra-react-select";
import { useState, useEffect } from "react";
import { Category } from "../../../../interfaces/Category";
import { axiosWrapper } from "../../controllers/axios/axiosWrapper";
import { CategoryOption } from "../../../../interfaces/Category";

interface FormCategoriesSelectProps {
	isInputErrorEnabled: boolean;
	preSelectedCategoryId?: Category["id"];
	selectedCategory: CategoryOption | null;
	onCategoryChange: (category: CategoryOption | null) => void;
}

export const FormCategoriesSelect = (props: FormCategoriesSelectProps) => {
	const [categoryOptions, setCategoryOptions] = useState<CategoryOption[]>([]);

	const isCategoryEmpty = props.selectedCategory === null;

	useEffect(() => {
		const fetchCategoryOptions = async () => {
			const categories = await axiosWrapper<Category[]>({
				url: "/categories",
				method: "GET",
			});
			if (!categories.data) return;
			const options = categories.data.map((category) => {
				return new CategoryOption(
					category.id,
					category.name,
					category.code,
					category.scope_level
				);
			});
			setCategoryOptions(options);
		};
		fetchCategoryOptions();
	}, []);

	useEffect(() => {
		if (props.preSelectedCategoryId) {
			const preSelectedCategory = categoryOptions.find((category) => {
				const parsedId = category.id;
				if (isNaN(parsedId)) return false;
				return parsedId === props.preSelectedCategoryId;
			});

			if (!preSelectedCategory) return;

			props.onCategoryChange(preSelectedCategory);
		}
	}, [
		props.preSelectedCategoryId,
		categoryOptions,
		props.onCategoryChange,
		props,
	]);

	useEffect(() => {
		props.onCategoryChange(props.selectedCategory);
	}, [props, props.selectedCategory]);

	return (
		<FormControl
			w={"full"}
			isRequired
			isInvalid={isCategoryEmpty && props.isInputErrorEnabled}>
			<FormLabel>Category:</FormLabel>
			<ReactSelect<{ value: string; label: string }>
				options={categoryOptions.map((category) => {
					return {
						label: category.label(),
						value: category.value(),
					};
				})}
				colorScheme="purple"
				required
				value={{
					value: props.selectedCategory?.value() ?? "",
					label: props.selectedCategory?.label() ?? "",
				}}
				onChange={(selectedOption) => {
					if (!selectedOption) return;
					const selectedCategory = categoryOptions.find(
						(category) => category.value() === selectedOption.value
					);
					if (!selectedCategory) return;
					props.onCategoryChange(selectedCategory);
				}}
			/>
			<FormErrorMessage>Category should not be empty</FormErrorMessage>
		</FormControl>
	);
};
