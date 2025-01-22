import { NextFunction, Request, Response } from "express";
import status from '../constants/status';
// const {constants} = require("../../constants");

const errorHandler = (err : Error, req : Request, res : Response, next : NextFunction) => {
    const statusCode = res.statusCode ? res.statusCode : 500

    switch(statusCode) {
        case status.BAD_REQUEST:
            res.json({
                title: "Bad Request", 
                message: err.message, 
                stackTrace: err.stack})
            break
        case status.NOT_FOUND:
            res.json({
                title: "Not Found", 
                message: err.message, 
                stackTrace: err.stack})
            break
        case status.FORBIDDEN:
            res.json({
                title: "Forbidden", 
                message: err.message, 
                stackTrace: err.stack})
            break
        case status.UNAUTHORIZED:
            res.json({
                title: "Unauthorized", 
                message: err.message, 
                stackTrace: err.stack})
            break
        case status.CONFLICT:
            res.json({
                title: "Conflict", 
                message: err.message, 
                stackTrace: err.stack})
            break
        case status.SERVER_ERROR:
            res.json({
                title: "Server Error", 
                message: err.message, 
                stackTrace: err.stack})
            break
        default:
            res.status(statusCode).json({ 
                title: "Unknown Error", 
                message: "An error occurred", 
                stackTrace: err.stack,
            });
            break;
    }
}

export default errorHandler;