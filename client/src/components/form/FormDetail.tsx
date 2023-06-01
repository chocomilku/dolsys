import {
	FormControl,
	FormErrorMessage,
	FormLabel,
	Input,
	LayoutProps,
} from "@chakra-ui/react";
import { capitalizeFirstLetter } from "../../utils/capitalizeFirstLetter";
import React, { memo, useCallback, useMemo } from "react";

interface FormDetailProps {
	/**
	 * @description
	 * Label for the input
	 * @example
	 * "Name"
	 * "Phase"
	 * "Unit"
	 */
	label: string;

	/**
	 * @description
	 * Value of the form input
	 * @example
	 * "Hello"
	 */
	value?: string;

	/**
	 * @description
	 * Function to be called when the input value changes
	 * @example
	 * (event) => setValue(event.target.value)
	 */
	onChange?: React.ChangeEventHandler<HTMLInputElement>;

	/**
	 * @description
	 * Whether the input is required or not
	 * @example
	 * true
	 */
	isRequired?: boolean;

	/**
	 * @description
	 * Whether the input value is error or incorrect in some arbitrary way
	 * @example
	 * return value === ""; // true
	 */
	isValueInvalid?: boolean;

	/**
	 * @description
	 * Whether the input is read only or not
	 */
	isReadOnly?: boolean;

	/**
	 * @description
	 * Custom error message to be displayed when the input value is invalid
	 * @example
	 * "Name should not be empty"
	 */
	errorMessage?: string;

	/**
	 * @description
	 * Max width of the input
	 * @example
	 * "100px"
	 * {{ base: "100%", md: "100px" }}
	 * @see https://chakra-ui.com/docs/features/responsive-styles#responsive-values
	 *
	 */
	maxW?: LayoutProps["maxW"];
}

const MemoizedInput = memo(Input);

export const FormDetail = (props: FormDetailProps) => {
	const formIdentifier = useMemo(() => {
		return (isCapitalized = false) => {
			if (!isCapitalized) return props.label;

			return capitalizeFirstLetter(props.label);
		};
	}, [props.label]);

	const handleBlur = useCallback(
		(event: React.FocusEvent<HTMLInputElement>) => {
			if (props.onChange) {
				return props.onChange(event);
			}
		},
		[props]
	);

	return (
		<>
			<FormControl
				isInvalid={props.isValueInvalid}
				isRequired={props.isRequired}
				maxW={props.maxW}>
				<FormLabel>{formIdentifier(true)}:</FormLabel>
				<MemoizedInput
					type="text"
					placeholder={formIdentifier(true)}
					colorScheme="purple"
					name={formIdentifier()}
					isDisabled={props.isReadOnly}
					isReadOnly={props.isReadOnly}
					onBlur={handleBlur}
					defaultValue={props.value}
				/>
				<FormErrorMessage>
					{props.errorMessage
						? props.errorMessage
						: `${formIdentifier(true)} should not be empty`}
				</FormErrorMessage>
			</FormControl>
		</>
	);
};
