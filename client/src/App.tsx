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
import { ProtectedRoute } from "./ProtectedRoute";
import { Box } from "@chakra-ui/react";
import {
  decodeUserPermissions,
  permissionCheck,
} from "./utils/permissionCheck";
import { Scopes } from "../../interfaces/Scopes";
import { routes } from "../../interfaces/Routes";

import { useEffect, useState } from "react";

function App(): JSX.Element {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [userPermissions, setUserPermissions] = useState<Scopes[]>([]);

  useEffect(() => {
    const getUserPermissions = async () => {
      if (!isAuthenticated) return;
      const token = await getAccessTokenSilently();
      if (!token) return;
      const permissions = decodeUserPermissions(token);

      setUserPermissions(permissions);
    };
    getUserPermissions();
  }, [getAccessTokenSilently, isAuthenticated]);

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
      isUserNotAllowed: !isAuthenticated
        ? true
        : permissionCheck(userPermissions, routes.Files.scopes),
    },
    {
      to: "/categories",
      leftIcon: <BiCategoryAlt />,
      pathName: "Categories",
      isUserNotAllowed: !isAuthenticated
        ? true
        : permissionCheck(userPermissions, routes.Categories.scopes),
    },
    {
      to: "/upload",
      leftIcon: <MdCloudUpload />,
      pathName: "Upload",
      isUserNotAllowed: !isAuthenticated
        ? true
        : permissionCheck(userPermissions, routes.Upload.scopes),
    },
  ];

  return (
    <>
      <NavBar
        isAuthenticated={isAuthenticated}
        user={user}
        navBarLinks={navBarRoutes}
      />
      <Box minHeight="100vh">
        <Routes>
          <Route path="/" element={<IndexPage />} />
          <Route
            path="/upload"
            element={
              <ProtectedRoute requiredPermissions={routes.Upload.scopes}>
                <UploadPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/files/*"
            element={
              <ProtectedRoute requiredPermissions={routes.Files.scopes}>
                <FilesRoutes />
              </ProtectedRoute>
            }
          />
          <Route
            path="/categories/*"
            element={
              <ProtectedRoute requiredPermissions={routes.Categories.scopes}>
                <CategoryRoutes />
              </ProtectedRoute>
            }
          />
          <Route path="/:uid" element={<IndexUIDPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Box>
      <Footer />
    </>
  );
}

export default App;
