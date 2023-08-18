/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, RequestHandler, Response } from "express";
import constants from "../constant/constant";

const notFoundPage: RequestHandler = ( req , res , next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404)
    next(error)
}

const ErrorHandler = (err:unknown, req:Request, res:Response ,next:NextFunction) => {
    const statusCode = res.statusCode ? res.statusCode : 500

    if(err instanceof Error ){
        switch (statusCode) {
            case constants.VALIDATION_ERROR:
                res.json({title:"Vaidation Failed",message: err.message, stackTrace: err.stack});
                break;
            case constants.NOT_FOUND:
                res.json({title:"Not found",message: err.message, stackTrace: err.stack});
                break;
            case constants.FORBIDDEN:
                res.json({title:"forbidden",message: err.message, stackTrace: err.stack});
                break;
            case constants.UNAUTHORIZED:
                res.json({title:"Unautorized",message: err.message, stackTrace: err.stack});
                break;
            case constants.SERVER_ERROR:
                res.json({title:"server error",message: err.message, stackTrace: err.stack});
                break;
        
            default:
                break;
    }}
}

export {
    notFoundPage,
    ErrorHandler
}