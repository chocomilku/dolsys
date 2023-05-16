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
} from "@chakra-ui/react";
import { ReactNode } from "react";

interface UpdateFormProps {
	children?: ReactNode;
	isOpen: boolean;
	onClose: () => void;
	formData: {
		header: string;
		submitText?: string;
		submitAction?: React.MouseEventHandler<HTMLButtonElement>;
	};
}

export const UpdateForm = (props: UpdateFormProps) => {
	return (
		<Modal isOpen={props.isOpen} onClose={props.onClose}>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>{props.formData.header}</ModalHeader>
				<ModalCloseButton />
				<ModalBody>{props.children}</ModalBody>

				<ModalFooter as={Flex} flexDirection="row" gap="0.5rem">
					<Button colorScheme="green" onClick={props.formData.submitAction}>
						{props.formData.submitText ?? "Save"}
					</Button>
					<Button colorScheme="blackAlpha" mr={3} onClick={props.onClose}>
						Cancel
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};
