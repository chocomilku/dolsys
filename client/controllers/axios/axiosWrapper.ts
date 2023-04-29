import axios, { AxiosRequestConfig } from "axios";

const defaultConfig: AxiosRequestConfig = {
	baseURL: import.meta.env.VITE_API_URL,
	method: "GET",
	headers: {
		"Content-Type": "application/json",
	},
};

export interface AxiosWrapperConfig extends AxiosRequestConfig {
	method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
	headers?: {
		[key: string]: string;
	};
}

export interface AxiosWrapperResponse<T> {
	data: T | null;
	status: number;
	error: string;
	failed: boolean;
}

export const axiosWrapper = async <T>(
	config: AxiosWrapperConfig
): Promise<AxiosWrapperResponse<T>> => {
	const axiosConfig: AxiosRequestConfig = {
		...defaultConfig,
		...config,
	};

	try {
		const response = await axios.request<T>(axiosConfig);

		return {
			data: response.data,
			status: response.status,
			error: "",
			failed: false,
		};
	} catch (error: unknown) {
		if (!axios.isAxiosError(error)) {
			return {
				data: null,
				status: 500,
				error: (error as Error).message,
				failed: true,
			};
		}

		const { response } = error;

		return {
			data: null,
			status: response ? response.status : 500,
			error: response ? response.statusText : "Something went wrong",
			failed: true,
		};
	}
};
