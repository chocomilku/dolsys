import {
	AxiosWrapperConfig,
	AxiosWrapperResponse,
	axiosWrapper,
} from "./axiosWrapper";

export const axiosWrapperWithAuthToken = async <T>(
	access_token: string,
	config: AxiosWrapperConfig
): Promise<AxiosWrapperResponse<T>> => {
	const axiosConfig: AxiosWrapperConfig = {
		...config,
		headers: {
			...config.headers,
			Authorization: `Bearer ${access_token}`,
		},
	};

	return await axiosWrapper<T>(axiosConfig);
};
