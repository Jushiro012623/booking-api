import { log } from "console";
import { NextFunction, Request, Response } from "express";
import jwt_config from "../config/jwt.config"
const jwt = require("jsonwebtoken");

interface CustomRequest extends Request {
    user?: {
        id: number;
        roles: { name: string }[];
        permissions: string[];
    };
}
export const requireAuthUser = (req : CustomRequest, res : Response, next : NextFunction) => {
    const token = getToken(req)
    if (!token){
        res.status(403)
        return next(new Error(`Access denied: Please sign in to continue.`))
    } 
    try {
        const user = jwt.verify(token, jwt_config.secret_key);
        req.user = user;
        next();
    } catch (error) {
        res.status(401);
        return next(new Error("Invalid or expired token: Authentication failed."));
    }
};
export const requireGuestUser = (req : Request, res : Response, next : NextFunction) => {
    const token = getToken(req)
    if (token) {
        res.status(401);
        return next(new Error(`Access denied: Please log out to access this resource.`))
    }
    next();
};
const getToken = (req : Request) => {
    const authHeader = req.headers["authorization"];
    return authHeader && authHeader.split(" ")[1];
}
export default {
    requireAuthUser,
    requireGuestUser,
}
