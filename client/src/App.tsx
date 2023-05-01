import { Routes, Route } from "react-router-dom";
import { IndexPage } from "./routes/index.route";
import { AdminRoutes } from "./routes/admin";
import { IndexUIDPage } from "./routes/index.[uid].route";
import { NotFoundPage } from "./routes/notFound.route";
import { useAuth0 } from "@auth0/auth0-react";
import { FileRoutes } from "./routes/files";
import { CategoryRoutes } from "./routes/categories";

import NavBar from "./components/NavBar";
import { NavLinkButtonProps } from "./components/nav/NavigationButtonLinks";
import { AiFillHome } from "react-icons/ai";
import { BiCategoryAlt } from "react-icons/bi";
import { VscFiles } from "react-icons/vsc";

const navBarRoutes: NavLinkButtonProps[] = [
	{
		to: "/",
		leftIcon: <AiFillHome />,
		pathName: "Home",
		end: true,
	},
	{
		to: "/files",
		leftIcon: <VscFiles />,
		pathName: "Files",
	},
	{
		to: "/categories",
		leftIcon: <BiCategoryAlt />,
		pathName: "Categories",
	},
];

function App(): JSX.Element {
	const { user, isAuthenticated } = useAuth0();

	return (
		<>
			<NavBar
				isAuthenticated={isAuthenticated}
				user={user}
				navBarLinks={navBarRoutes}
			/>
			<main
				style={{ backgroundColor: "#232323", width: "100%", height: "100vh" }}>
				<Routes>
					<Route path="/" element={<IndexPage />} />
					<Route path="/admin/*" element={<AdminRoutes />} />
					<Route path="/files/*" element={<FileRoutes />} />
					<Route path="/categories/*" element={<CategoryRoutes />} />
					<Route path="/:uid" element={<IndexUIDPage />} />
					<Route path="*" element={<NotFoundPage />} />
				</Routes>
			</main>
		</>
	);
}

export default App;
