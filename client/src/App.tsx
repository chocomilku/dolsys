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
        : permissionCheck(userPermissions, ["view:files"]),
    },
    {
      to: "/categories",
      leftIcon: <BiCategoryAlt />,
      pathName: "Categories",
      isUserNotAllowed: !isAuthenticated
        ? true
        : permissionCheck(userPermissions, ["view:category"]),
    },
    {
      to: "/upload",
      leftIcon: <MdCloudUpload />,
      pathName: "Upload",
      isUserNotAllowed: !isAuthenticated
        ? true
        : permissionCheck(userPermissions, ["upload:files"]),
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
          <Route path="/upload" element={<UploadPage />} />
          <Route
            path="/files/*"
            element={
              <ProtectedRoute requiredPermissions={["view:files"]}>
                <FilesRoutes />
              </ProtectedRoute>
            }
          />
          <Route path="/categories/*" element={<CategoryRoutes />} />
          <Route path="/:uid" element={<IndexUIDPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Box>
      <Footer />
    </>
  );
}

export default App;
