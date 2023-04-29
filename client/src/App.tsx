import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { uploadFile } from "../controllers/uploadFile";
import QRCode from "react-qr-code";
import LoginButton from "../components/Login";
import LogoutButton from "../components/Logout";
import Profile from "../components/Profile";
import { useAuth0 } from "@auth0/auth0-react";
import { axiosWrapperWithAuthToken } from "../controllers/axios/axiosWrapperWithAuthToken";

function App() {
	const [file, setFile] = useState<File>();
	const [returnLink, setReturnLink] = useState("");
	const [message, setMessage] = useState<string>("");

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
	});

	const handleFileSelect = (event: ChangeEvent<HTMLInputElement>) => {
		if (!event.target.files) return;
		setFile(event.target.files[0]);
	};

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const access_token = await getAccessTokenSilently();
		if (!user?.sub) return;
		if (!file) return;
		const response = await uploadFile(access_token, file, user.sub);
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

			<form onSubmit={handleSubmit}>
				<input type="file" name="file" onChange={handleFileSelect} />
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
