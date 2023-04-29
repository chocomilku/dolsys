import { Request, Response, NextFunction } from "express";
import { InsufficientScopeError } from "express-oauth2-jwt-bearer";
import { claimCheck } from "express-oauth2-jwt-bearer";

export const checkRequiredPermissions = (requiredPermissions: string[]) => {
	return (req: Request, res: Response, next: NextFunction) => {
		const permissionCheck = claimCheck((payload) => {
			const permissions = payload.permissions as string[];

			const hasPermissions = requiredPermissions.every((requiredPermission) => {
				return permissions.includes(requiredPermission);
			});

			if (!hasPermissions) throw new InsufficientScopeError();

			return hasPermissions;
		});

		return permissionCheck(req, res, next);
	};
};
