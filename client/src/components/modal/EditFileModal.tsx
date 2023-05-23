import { Code } from "@chakra-ui/react";
import { FilesWithCategoriesWithoutPathAndUserID } from "../../../../interfaces/FileMetadata";
import { BaseFormModal } from "./BaseFormModal";

interface EditFileModalProps {
	isOpen: boolean;
	onClose: () => void;
	file: FilesWithCategoriesWithoutPathAndUserID | undefined;
}

export const EditFileModal = (props: EditFileModalProps) => {
	console.log(props.file);
	return (
		<>
			<BaseFormModal
				isOpen={props.isOpen}
				onClose={props.onClose}
				formData={{
					header: "Edit File Metadata",
				}}>
				<Code>{JSON.stringify(props.file, null, 4)}</Code>
			</BaseFormModal>
		</>
	);
};
