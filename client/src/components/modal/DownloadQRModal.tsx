import { BaseFormModal } from "./BaseFormModal";
import { FileMetadata } from "../../../../interfaces/File";
import { CustomQRCode } from "../QRCode";
import { Box, Code, Flex, LightMode } from "@chakra-ui/react";
import { useMemo } from "react";

interface DownloadQRModalProps {
  isOpen: boolean;
  onClose: () => void;
  file: FileMetadata | undefined;
}

export const DownloadQRModal = (props: DownloadQRModalProps) => {
  const fileLink = useMemo(() => {
    return `${window.location.origin}/${props.file?.uid}`;
  }, [props.file?.uid]);

  return (
    <BaseFormModal
      isOpen={props.isOpen}
      onClose={props.onClose}
      formData={{
        header: "Download QR Code",
        submitText: "Download",
        submitAction: () => alert("i"),
        stayOnClick: true,
      }}
    >
      <Box
        background={"white"}
        p={"1rem"}
        borderRadius={"15px"}
        borderColor="blackAlpha.900"
        borderWidth="1px"
        borderStyle="solid"
      >
        <Flex direction="column" alignItems="center" justifyContent="center">
          <CustomQRCode
            data={fileLink}
            backgroundColor="transparent"
            dotColor={props.file?.category_color ?? "black"}
          />
          <LightMode>
            <Code
              colorScheme="purple"
              fontSize="xl"
              textAlign="center"
              p={"0.35rem"}
              my={"0.5rem"}
            >
              {fileLink}
            </Code>
          </LightMode>
        </Flex>
      </Box>
    </BaseFormModal>
  );
};
