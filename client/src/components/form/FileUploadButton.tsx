import { Button } from "@chakra-ui/react";

interface FileButtonProps {
	isUploading: boolean;
}

export const FileButton = ({ isUploading }: FileButtonProps) => {
	return (
		<Button
			type="submit"
			variant={"solid"}
			colorScheme="purple"
			size={"lg"}
			w={{ base: "100%", md: "md" }}
			alignSelf={"center"}
			isLoading={isUploading}
			loadingText="Uploading">
			Upload
		</Button>
	);
};
