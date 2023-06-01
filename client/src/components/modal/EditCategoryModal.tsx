import {
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Input,
  useToast,
} from "@chakra-ui/react";
import { Category } from "../../../../interfaces/Category";
import React, { useEffect, useState } from "react";
import { BaseFormModal } from "./BaseFormModal";
import { FormDetail } from "../form/FormDetail";
import { useAuth0 } from "@auth0/auth0-react";
import { editCategory } from "../../controllers/editCategory";

interface EditCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  category: Category;
}

export const EditCategoryModal = (props: EditCategoryModalProps) => {
  const { getAccessTokenSilently } = useAuth0();
  const toast = useToast();
  const [category, setCategory] = useState<Category>(props.category);

  useEffect(() => {
    setCategory(props.category);
  }, [props.category]);

  const handleFormChange = (event: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget;

    setCategory((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const submitEdits = async () => {
    const response = await editCategory(
      await getAccessTokenSilently(),
      category
    );

    if (!response || (response && response.status !== 200)) return;

    toast({
      title: "Category Updated!",
      description: "Category has been updated.",
      status: "success",
      duration: 10000,
      isClosable: true,
      position: "top-right",
    });
    props.onClose();
  };

  return (
    <>
      <BaseFormModal
        isOpen={props.isOpen}
        onClose={props.onClose}
        size="xl"
        formData={{
          header: "Edit Category",
          submitAction: () => submitEdits(),
        }}
      >
        <Grid templateColumns={{ base: "1fr", md: "1fr 8fr" }}>
          <GridItem as={FormControl}>
            <FormLabel>ID:</FormLabel>
            <Input
              type="number"
              placeholder={"File ID"}
              isReadOnly
              isTruncated
              colorScheme="purple"
              value={category.id}
            />
          </GridItem>
          <GridItem>
            <FormDetail
              label="name"
              value={category.name}
              onChange={handleFormChange}
              isRequired
            />
          </GridItem>
        </Grid>
        <Grid>
          <GridItem>
            <FormDetail
              label="code"
              value={category.code}
              onChange={handleFormChange}
              isRequired
            />
          </GridItem>
          <GridItem>
            <FormDetail
              label="scope_level"
              value={category.scope_level}
              onChange={handleFormChange}
            />
          </GridItem>
          <GridItem>
            <FormDetail
              label="color"
              value={category.color}
              onChange={handleFormChange}
            />
          </GridItem>
        </Grid>
      </BaseFormModal>
    </>
  );
};
