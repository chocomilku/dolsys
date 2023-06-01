import { Category } from "../../../interfaces/Category"
import { axiosWrapperWithAuthToken } from "./axios/axiosWrapperWithAuthToken"

export const editCategory = async (access_token: string, category: Category) => {
    try {
        const updateCategory = await axiosWrapperWithAuthToken<Record<string, never>>(access_token, {
            method: "PUT",
            url: `/categories/${category.id}`,
            data: category
        });

        if (!updateCategory) return;

        return updateCategory;
    } catch (error) {
        console.log(error)
    }
}