import { Request, Response, NextFunction } from "express";
import { InsufficientScopeError } from "express-oauth2-jwt-bearer";
import { claimCheck } from "express-oauth2-jwt-bearer";
import { Scopes } from "../../../interfaces/Scopes";

export const checkRequiredPermissions = (requiredPermissions: Scopes[]) => {
	return (req: Request, res: Response, next: NextFunction) => {
		const permissionCheck = claimCheck((payload) => {
			const permissions = payload.permissions as Scopes[];

			const hasPermissions = requiredPermissions.every((requiredPermission) => {
				return permissions.includes(requiredPermission);
			});

			if (!hasPermissions) throw new InsufficientScopeError();

			return hasPermissions;
		});

		return permissionCheck(req, res, next);
	};
};
