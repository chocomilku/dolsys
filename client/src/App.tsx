import { Routes, Route } from "react-router-dom";
import { IndexPage } from "../routes/index.route";
import { AdminRoutes } from "../routes/admin";
import { IndexUIDPage } from "../routes/index.[uid].route";
import { NotFoundPage } from "../routes/notFound.route";

function App(): JSX.Element {
	return (
		<Routes>
			<Route path="/" element={<IndexPage />} />
			<Route path="/admin/*" element={<AdminRoutes />} />
			<Route path="/:uid" element={<IndexUIDPage />} />
			<Route path="*" element={<NotFoundPage />} />
		</Routes>
	);
}

export default App;
