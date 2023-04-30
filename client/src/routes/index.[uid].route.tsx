import { useParams } from "react-router-dom";

export const IndexUIDPage = (): JSX.Element => {
	const { uid } = useParams();

	return (
		<h1>
			UID: <code>{uid}</code>
		</h1>
	);
};
