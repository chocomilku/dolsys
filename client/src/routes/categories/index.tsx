import { Routes, Route } from "react-router-dom";
import { CategoryIndexPage } from "./index.route";
import { NotFoundPage } from "../notFound.route";

export const CategoryRoutes = (): JSX.Element => {
	return (
		<Routes>
			<Route path="/" element={<CategoryIndexPage />} />
			<Route path="*" element={<NotFoundPage />} />
		</Routes>
	);
};
