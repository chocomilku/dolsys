import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from "react";
import { uploadFile } from "../controllers/uploadFile";
import QRCode from "react-qr-code";
import LoginButton from "../components/Login";
import LogoutButton from "../components/Logout";
import Profile from "../components/Profile";
import { useAuth0 } from "@auth0/auth0-react";
import { axiosWrapperWithAuthToken } from "../controllers/axios/axiosWrapperWithAuthToken";
import Select from "react-select";
import { axiosWrapper } from "../controllers/axios/axiosWrapper";
import type { Categories } from "../../interfaces/Categories";

function App() {
	const [file, setFile] = useState<File>();
	const [returnLink, setReturnLink] = useState("");
	const [message, setMessage] = useState<string>("");
	const [selectedOption, setSelectedOption] = useState<{
		value: string;
		label: string;
	} | null>(null);
	const [categoryOptions, setCategoryOptions] = useState<
		{
			value: string;
			label: string;
		}[]
	>([]);

	const { getAccessTokenSilently, user } = useAuth0();

	useEffect(() => {
		const getMessage = async () => {
			const access_token = await getAccessTokenSilently();
			const data = await axiosWrapperWithAuthToken<{ message: string }>(
				access_token,
				{ url: "/" }
			);

			setMessage(data.data ? data.data.message : data.error);
		};

		getMessage();
	}, [getAccessTokenSilently]);

	useEffect(() => {
		const fetchCategoryOptions = async () => {
			const data = await axiosWrapper<Categories[]>({ url: "/categories" });
			if (!data.data) return;
			const options = data.data?.map((category) => {
				return {
					value: `${category.id}${category.code && `-${category.code}`}`,
					label: category.name,
				};
			});
			setCategoryOptions(options);
		};
		fetchCategoryOptions();
	}, []);

	const parsedCategoryId = useMemo(() => {
		if (!selectedOption) return;

		const parsedId = parseInt(selectedOption?.value.split("-")[0]);

		if (isNaN(parsedId)) return;

		return parsedId;
	}, [selectedOption]);

	const handleFileSelect = (event: ChangeEvent<HTMLInputElement>) => {
		if (!event.target.files) return;
		setFile(event.target.files[0]);
	};

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const access_token = await getAccessTokenSilently();
		if (!user?.sub) return;
		if (!file) return;
		if (!parsedCategoryId) return;
		const response = await uploadFile(
			access_token,
			file,
			user.sub,
			parsedCategoryId
		);
		if (!response.data) return;
		const uploadedUID = response.data.uid;

		setReturnLink(`${import.meta.env.VITE_API_URL}/${uploadedUID}`);
	};

	return (
		<>
			<h1>ewan</h1>

			<LoginButton />
			<LogoutButton />
			<Profile />

			<code>{JSON.stringify(selectedOption)}</code>
			<form onSubmit={handleSubmit}>
				<input type="file" name="file" onChange={handleFileSelect} />
				<br />
				<Select
					defaultValue={selectedOption}
					onChange={(opt) => setSelectedOption(opt)}
					options={categoryOptions}
				/>
				<br />
				<input type="submit" value="Upload" />
			</form>
			<a href={returnLink}>{returnLink}</a>
			{returnLink && <QRCode value={returnLink} />}
			{message && <p>{message}</p>}
		</>
	);
}

export default App;
