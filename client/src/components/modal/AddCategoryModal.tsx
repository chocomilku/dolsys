import { Grid, GridItem, useToast } from "@chakra-ui/react";
import { CategoryWithoutID } from "../../../../interfaces/Category";
import React, { useState } from "react";
import { BaseFormModal } from "./BaseFormModal";
import { FormDetail } from "../form/FormDetail";
import { useAuth0 } from "@auth0/auth0-react";
import { addCategory } from "../../controllers/addCategory";

interface AddCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddCategoryModal = (props: AddCategoryModalProps) => {
  const { getAccessTokenSilently } = useAuth0();
  const toast = useToast();
  const [category, setCategory] = useState<CategoryWithoutID>({
    name: "",
    code: "",
    scope_level: "",
    color: "",
  });

  const handleFormChange = (event: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget;

    setCategory({ ...category, [name]: value });
  };

  const submitCategory = async () => {
    if (!category) return;

    const response = await addCategory(
      await getAccessTokenSilently(),
      category
    );
    if (!response) return;

    toast({
      title: "Category Added!",
      description: "Category has been added.",
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
          submitText: "Add Category",
          submitAction: () => submitCategory(),
        }}
      >
        <Grid>
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
