import { NextFunction, Response, Request } from "express";
const db = require('../models')
const jwt = require('jsonwebtoken')
import catchAsync from "../utils/catchAsync";
const permissions = (requiredPermissions : any) => {
    return catchAsync( async(req : any, res : Response, next : NextFunction) => {
        const user_id = req.user.id;
        const user = await db.User.findOne({
            where: { id: user_id },
            include: {
                model: db.Roles,
                include: db.Permission,
            }
        });
        const userPermissions = user.Roles.flatMap((role : any) => role.Permissions.map((perm : any) => perm.name));
        const userRoles = user.Roles.map((role : any) => role.name);

        if (requiredPermissions.some((perm : any) => userPermissions.includes(perm)) || userRoles.includes('admin')) {
            return next();
        } else {
            res.status(403)
            return next(new Error(`Access denied. The user does not have the required role.`))
        }
    })
};

module.exports = permissions