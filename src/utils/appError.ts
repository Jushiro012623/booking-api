export default class AppError extends Error {
    constructor(public statusCode : any, message : any) {
        super(message);
        this.statusCode = statusCode;
        this.message = message;
    }
}