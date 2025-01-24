import { NextFunction, Response } from "express";

export default (res : Response, next : NextFunction, message : string, status : number) => {
    res.status(401)
    return next(new Error("Invalid Credentials"));
}