import { FormControl, FormErrorMessage, FormLabel } from "@chakra-ui/react";
import { Select as ReactSelect } from "chakra-react-select";
import { useState, useEffect } from "react";
import { Categories } from "../../../../interfaces/Categories";
import { axiosWrapper } from "../../controllers/axios/axiosWrapper";
import { ICategoryOptions } from "../../../../interfaces/Categories";

interface FormCategoriesSelectProps {
	isInputErrorEnabled: boolean;
	preSelectedCategoryId?: Categories["id"];
	selectedCategory: ICategoryOptions | null;
	onCategoryChange: (category: ICategoryOptions | null) => void;
}

export const FormCategoriesSelect = (props: FormCategoriesSelectProps) => {
	const [categoryOptions, setCategoryOptions] = useState<ICategoryOptions[]>(
		[]
	);

	const isCategoryEmpty = props.selectedCategory === null;

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

	useEffect(() => {
		if (props.preSelectedCategoryId) {
			const preSelectedCategory = categoryOptions.find((category) => {
				const parsedId = parseInt(category.value.split("-")[0]);
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
			<FormLabel>Category</FormLabel>
			<ReactSelect
				onChange={(value) => props.onCategoryChange(value)}
				options={categoryOptions}
				colorScheme="purple"
				required
				value={props.selectedCategory}
			/>
			<FormErrorMessage>Category should not be empty</FormErrorMessage>
		</FormControl>
	);
};
