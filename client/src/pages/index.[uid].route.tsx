import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { axiosWrapper } from "../controllers/axios/axiosWrapper";
import { FileMetadata } from "../../../interfaces/File";
import {
  Box,
  Container,
  Flex,
  Heading,
  Text,
  Code,
  Spinner,
  DarkMode,
} from "@chakra-ui/react";
import "../styles/home.css";

export const IndexUIDPage = (): JSX.Element => {
  const { uid } = useParams();
  const [fileMetadata, setFileMetadata] = useState<FileMetadata>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    const downloadFileAndFetchMetadata = async () => {
      try {
        setIsError(false);
        setErrorMessage("");
        setIsLoading(true);
        const fetchFileMetadata = await axiosWrapper<FileMetadata>({
          url: `/files/${uid}`,
          method: "GET",
        });

        if (fetchFileMetadata.status !== 200) {
          setIsError(true);
          setErrorMessage(fetchFileMetadata.error);
          setIsLoading(false);
          return;
        } else {
          const downloadFile = await axiosWrapper<File>({
            url: `/files/${uid}/download`,
            method: "GET",
          });

          if (downloadFile.status !== 200) {
            setIsError(true);
            setErrorMessage(downloadFile.error);
            setIsLoading(false);
            return;
          }

          if (!fetchFileMetadata.data) return;
          if (!downloadFile.data) return;

          setFileMetadata(fetchFileMetadata.data);

          const url = window.URL.createObjectURL(new Blob([downloadFile.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", fetchFileMetadata.data.file_name);
          document.body.appendChild(link);
          link.click();
          link.parentNode?.removeChild(link);
          setIsLoading(false);
        }
      } catch (error) {
        console.log(error);
      }
    };
    downloadFileAndFetchMetadata();
  }, [uid]);

  return (
    <>
      <Box className="spacer dl">
        <Container maxW="container.xl" p={{ base: 4, md: 8 }}>
          <Flex
            alignItems="center"
            justifyContent="center"
            height="full"
            width="full"
            direction="column"
            gap={{ base: "1rem", md: "3rem" }}
          >
            {isLoading ? (
              <>
                <Heading textColor="white">Loading...</Heading>
                <Spinner size="xl" />
              </>
            ) : isError ? (
              <>
                <Heading textColor="white">{errorMessage}</Heading>
                <DarkMode>
                  <Code fontSize="xl">
                    - Check your spelling {""}
                    <br />- Service might be down {""}
                    <br />- Try again later
                  </Code>
                </DarkMode>
              </>
            ) : (
              <>
                <Heading textColor="white">Thanks for Downloading!</Heading>
                <DarkMode>
                  <Code fontSize={"3xl"} textAlign="center">
                    <Text>{fileMetadata?.title}</Text>
                    <Text>{fileMetadata?.file_name}</Text>
                    <Text>
                      {fileMetadata?.category_name}{" "}
                      {fileMetadata?.category_scope_level}
                    </Text>
                    <Text>DL Count: {fileMetadata?.download_count}</Text>
                  </Code>
                </DarkMode>
              </>
            )}
          </Flex>
        </Container>
      </Box>
    </>
  );
};
