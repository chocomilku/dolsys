import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalCloseButton,
	ModalBody,
	ModalFooter,
	Button,
	Flex,
	ThemingProps,
} from "@chakra-ui/react";
import { ReactNode } from "react";

interface BaseFormModalProps {
	children?: ReactNode;
	isOpen: boolean;
	onClose: () => void;
	formData: {
		header: string;
		submit?: {
			submitText?: string;
			submitAction?: React.MouseEventHandler<HTMLButtonElement>;
		};
	};
	size?: ThemingProps<"Modal">["size"];
}

export const BaseFormModal = (props: BaseFormModalProps) => {
	const closeOnClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
		if (props.formData.submit && props.formData.submit.submitAction) {
			props.formData.submit.submitAction(event);
		}
		props.onClose();
	};

	return (
		<Modal isOpen={props.isOpen} onClose={props.onClose} size={props.size}>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>{props.formData.header}</ModalHeader>
				<ModalCloseButton />
				<hr />
				<ModalBody>{props.children}</ModalBody>

				<ModalFooter as={Flex} flexDirection="row" gap="0.5rem">
					{props.formData.submit && (
						<Button colorScheme="green" onClick={closeOnClick}>
							{props.formData.submit.submitText ?? "Save"}
						</Button>
					)}
					<Button colorScheme="blackAlpha" onClick={props.onClose}>
						Cancel
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};
