import { Routes, Route } from "react-router-dom";
import { AdminIndexPage } from "./index.route";
import { NotFoundPage } from "../notFound.route";

export const AdminRoutes = (): JSX.Element => {
	return (
		<Routes>
			<Route path="/" element={<AdminIndexPage />} />
			<Route path="*" element={<NotFoundPage />} />
		</Routes>
	);
};
