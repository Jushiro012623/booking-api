import { NextFunction, Request, Response } from "express";

const jwt = require("jsonwebtoken");
const secret_key = require("../config/jwt.config");
const isAuthenticated = (req : any, res : Response, next : NextFunction) => {

    const token = getToken(req)
    if (!token) return res.status(403).json({ success: false, message: "Action Unauthorized"  });
    try {
        const user = jwt.verify(token, secret_key);
        req.user = user;
        next();
    } catch (error) {
        res.status(403).json({ success: false, message: "Action Unauthorized"  });
    }
};
const isGuest = (req : Request, res : Response, next : NextFunction) => {
    const token = getToken(req)
    if (token) {
        return res.status(401).json({ success: false, message: "Action Unauthorized" });
    }
  next();
};

const getToken = (req : Request) => {
    const authHeader = req.headers["authorization"];
    return authHeader && authHeader.split(" ")[1];
}
module.exports = {isAuthenticated, isGuest};
