import { NextFunction, Response } from "express"
import catchAsync from "../utils/catchAsync"
const db = require("../models")


export default (requiredRoles: string | string[]) => {
    return catchAsync(async (req: any, res: Response, next: NextFunction) => {
        const user = req.user;
        console.log(user);
        // Get the user roles and handle the case if it's a Promise (as it often is with Sequelize)
        const userRoles = (await user.getRoles()).map((role: any) => role.name);

        // Ensure `requiredRoles` is always an array
        const rolesToCheck = Array.isArray(requiredRoles) ? requiredRoles : [requiredRoles];

        // Check if the user has at least one of the required roles
        const hasRequiredRole = rolesToCheck.some((role: string) => userRoles.includes(role));

        if (!hasRequiredRole) {
            res.status(403);  // Forbidden status
            return next(new Error('Access denied. The user does not have the required role.'));
        }

        next();  // Proceed if the user has the required role
    });
};
