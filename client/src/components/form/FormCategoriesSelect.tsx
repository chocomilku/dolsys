import { FormControl, FormErrorMessage, FormLabel } from "@chakra-ui/react";
import { Select as ReactSelect } from "chakra-react-select";
import { useState, useEffect, useMemo } from "react";
import { Categories } from "../../../../interfaces/Categories";
import { axiosWrapper } from "../../controllers/axios/axiosWrapper";
import { ICategoryOptions } from "../../../../interfaces/Categories";

interface FormCategoriesSelectProps {
	isInputErrorEnabled: boolean;
	preSelectedCategoryId?: Categories["id"];
	selectedCategory: ICategoryOptions | null;
	onCategoryChange: (category: ICategoryOptions | null) => void;
}

class Category {
	id: number;
	name: string;
	code?: string;
	scope_level?: string;
	constructor(id: number, name: string, code?: string, scope_level?: string) {
		this.id = id;
		this.name = name;
		this.code = code;
		this.scope_level = scope_level;
	}

	public value = () => {
		return `${this.id}${this.code && `-${this.code}`}`;
	};

	public label = () => {
		return `${this.name} ${this.scope_level && `${this.scope_level}`}`;
	};
}

export const FormCategoriesSelect = (props: FormCategoriesSelectProps) => {
	const [categoryOptions, setCategoryOptions] = useState<Category[]>([]);

	const isCategoryEmpty = props.selectedCategory === null;

	const categoryOptionsSelection = useMemo(() => {
		return categoryOptions.map((category) => {
			return {
				label: category.label(),
				value: category.value(),
			};
		});
	}, [categoryOptions]);

	useEffect(() => {
		const fetchCategoryOptions = async () => {
			const categories = await axiosWrapper<Categories[]>({
				url: "/categories",
				method: "GET",
			});
			if (!categories.data) return;
			const options = categories.data.map((category) => {
				return new Category(
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

			props.onCategoryChange({
				label: preSelectedCategory.label(),
				value: preSelectedCategory.value(),
			});
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
				options={categoryOptionsSelection}
				colorScheme="purple"
				required
				value={props.selectedCategory}
			/>
			<FormErrorMessage>Category should not be empty</FormErrorMessage>
		</FormControl>
	);
};
