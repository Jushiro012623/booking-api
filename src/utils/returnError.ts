import { NextFunction, Response } from "express";

export default (res : Response, next : NextFunction, message : string, status : number) => {
    res.status(status)
    return next(new Error(message));
}