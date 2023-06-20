import { NextFunction, Request, Response } from "express";

function consoleLogger(request: Request, response: Response, next: NextFunction) {
    console.log("Method: " + request.method + ", Route: " + request.originalUrl);
    next();
}

export default consoleLogger;
