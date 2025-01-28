import { NextFunction, Request, Response } from "express";
import 'dotenv/config'
import { AppError } from "../utils/appError";
const env = process.env.NODE_ENV
const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    let statusCode = 500;
    let message = 'An unknown error occurred';
    
    if (err instanceof AppError) {
        statusCode = err.statusCode;
        message = err.message;
    } else {
        message = 'Something went wrong';
    }

    res.status(statusCode).json({
        status: 'Error',
        message,
        stackTrace: env === 'development' ? err.stack : undefined,
        timestamp: new Date().toISOString(),
        success: false,
    });
};
export default errorHandler;