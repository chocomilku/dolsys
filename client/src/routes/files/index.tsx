import { Routes, Route } from "react-router-dom";
import { FileIndexPage } from "./index.route";
import { NotFoundPage } from "../notFound.route";

export const FileRoutes = (): JSX.Element => {
	return (
		<Routes>
			<Route path="/" element={<FileIndexPage />} />
			<Route path="*" element={<NotFoundPage />} />
		</Routes>
	);
};
