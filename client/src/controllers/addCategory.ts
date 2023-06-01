import { Category, CategoryWithoutID } from "../../../interfaces/Category"
import { axiosWrapperWithAuthToken } from "./axios/axiosWrapperWithAuthToken"

export const addCategory = async (access_token: string, category: CategoryWithoutID) => {
    try {
        const updateCategory = await axiosWrapperWithAuthToken<Category>(access_token, {
            method: "POST",
            url: `/categories`,
            data: category
        });

        if (!updateCategory) return;

        return updateCategory;
    } catch (error) {
        console.log(error)
    }
}