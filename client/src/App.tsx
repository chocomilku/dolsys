import { Routes, Route } from "react-router-dom";
import { IndexPage } from "./pages/index.route";
import { IndexUIDPage } from "./pages/index.[uid].route";
import { NotFoundPage } from "./pages/notFound.route";
import { useAuth0 } from "@auth0/auth0-react";
import { UploadPage } from "./pages/upload";
import { CategoryRoutes } from "./pages/categories";

import NavBar from "./components/NavBar";
import { NavLinkButtonProps } from "./components/nav/NavigationButtonLinks";
import { AiFillHome } from "react-icons/ai";
import { BiCategoryAlt } from "react-icons/bi";
import { VscFiles } from "react-icons/vsc";
import Footer from "./components/footer/Footer";
import { FilesRoutes } from "./pages/files";
import { MdCloudUpload } from "react-icons/md";

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
	{
		to: "/upload",
		leftIcon: <MdCloudUpload />,
		pathName: "Upload",
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
			<main>
				<Routes>
					<Route path="/" element={<IndexPage />} />
					<Route path="/upload" element={<UploadPage />} />
					<Route path="/files/*" element={<FilesRoutes />} />
					<Route path="/categories/*" element={<CategoryRoutes />} />
					<Route path="/:uid" element={<IndexUIDPage />} />
					<Route path="*" element={<NotFoundPage />} />
				</Routes>
			</main>
			<Footer />
		</>
	);
}

export default App;
