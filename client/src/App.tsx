import { Routes, Route } from "react-router-dom";
import { IndexPage } from "./routes/index.route";
import { AdminRoutes } from "./routes/admin";
import { IndexUIDPage } from "./routes/index.[uid].route";
import { NotFoundPage } from "./routes/notFound.route";
import NavBar from "./components/NavBar";
import { useAuth0 } from "@auth0/auth0-react";

function App(): JSX.Element {
	const { user, isAuthenticated } = useAuth0();

	return (
		<>
			<NavBar isAuthenticated={isAuthenticated} user={user} />
			<main
				style={{ backgroundColor: "#232323", width: "100%", height: "100vh" }}>
				<Routes>
					<Route path="/" element={<IndexPage />} />
					<Route path="/admin/*" element={<AdminRoutes />} />
					<Route path="/:uid" element={<IndexUIDPage />} />
					<Route path="*" element={<NotFoundPage />} />
				</Routes>
			</main>
		</>
	);
}

export default App;
