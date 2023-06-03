import { Scopes } from "../../interfaces/Scopes";
import { decodeToken } from "react-jwt";
import { useAuth0 } from "@auth0/auth0-react";
import { Navigate } from "react-router-dom";
import React, { useEffect } from "react";

interface ProtectedRouteProps {
  requiredPermissions: Scopes[];
  children: React.ReactNode;
}

export const ProtectedRoute = ({
  children,
  requiredPermissions,
}: ProtectedRouteProps) => {
  const { getAccessTokenSilently } = useAuth0();

  const [isLoading, setIsLoading] = React.useState(true);
  const [hasPermissions, setHasPermissions] = React.useState(false);

  useEffect(() => {
    const checkPermissions = async () => {
      try {
        const token = await getAccessTokenSilently();
        const decodedToken = decodeToken(token);

        const permissions = (decodedToken as { permissions: Scopes[] })
          .permissions;

        const hasPermissions = requiredPermissions.every((p) =>
          permissions.includes(p)
        );

        setHasPermissions(hasPermissions);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setHasPermissions(false);
      }
    };
    checkPermissions();
  }, [getAccessTokenSilently, requiredPermissions]);

  if (isLoading) return <div>Loading...</div>;
  if (!hasPermissions) return <Navigate to="/" />;

  return <>{children}</>;
};
