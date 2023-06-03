import { decodeToken } from "react-jwt";
import { Scopes } from "../../../interfaces/Scopes";

export const decodeJwt = <T>(token: string) => {
    return decodeToken(token) as T;
}

export const decodeUserPermissions = (auth0JWT: string) => {
    const decodedJwt = decodeJwt<{ permissions: Scopes[] }>(auth0JWT);
    return decodedJwt.permissions;
}

/**
 * Checks the users permissions against the required permissions
 * @param requiredScopes Scopes that are required to access the route
 * @param userScopes Scopes that the user has
 * @returns Boolean that indicates if the user has the required permissions
 */
export const permissionCheck = (userScopes: Scopes[], requiredScopes: Scopes[]) => {
    return userScopes.every((scope) => requiredScopes.includes(scope));
}

export const isUserHavePermission = (auth0JWT: string, userScopes: Scopes[]) => {
    const decodedJwt = decodeJwt<{ permissions: Scopes[] }>(auth0JWT);
    return permissionCheck(userScopes, decodedJwt.permissions);
}