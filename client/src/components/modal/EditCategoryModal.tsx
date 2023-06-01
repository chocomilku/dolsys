import { FormControl, FormLabel, Grid, GridItem, Input} from "@chakra-ui/react";
import { Category } from "../../../../interfaces/Category";
import React, { useEffect, useState } from "react";
import { BaseFormModal } from "./BaseFormModal";
import { FormDetail } from "../form/FormDetail";

interface EditCategoryModalProps {
    isOpen: boolean;
    onClose: () => void;
    category: Category;
}

export const EditCategoryModal = (props: EditCategoryModalProps) => {
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
        })
    }

    
    return (
        <>
            <BaseFormModal
                isOpen={props.isOpen}
                onClose={props.onClose}
                size="xl"
                formData={{
                    header: "Edit Category",
                }}
            >
                <Grid templateColumns={{base: "1fr", md: "1fr 8fr"}}>
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
                        <FormDetail label="name" value={category.name} onChange={handleFormChange} />
                    </GridItem>
                </Grid>
                <Grid>
                <GridItem>
                        <FormDetail label="code" value={category.code} onChange={handleFormChange} />
                    </GridItem><GridItem>
                        <FormDetail label="scope_level" value={category.scope_level} onChange={handleFormChange} />
                    </GridItem><GridItem>
                        <FormDetail label="color" value={category.color} onChange={handleFormChange} />
                    </GridItem>
                </Grid>

            </BaseFormModal>
        </>
    )
}