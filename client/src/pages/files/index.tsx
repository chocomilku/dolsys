import { Routes, Route } from "react-router-dom";
import { FilesIndexPage } from "./index.route";
import { NotFoundPage } from "../notFound.route";

export const FilesRoutes = (): JSX.Element => {
	return (
		<Routes>
			<Route path="/" element={<FilesIndexPage />} />
			<Route path="*" element={<NotFoundPage />} />
		</Routes>
	);
};
