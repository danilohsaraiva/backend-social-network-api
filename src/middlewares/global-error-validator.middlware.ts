import { Request, Response, NextFunction } from "express";
import { HTTPError, HTTPResponse } from "../utils";

export function errorMiddleware(err: unknown, req: Request, res: Response, next: NextFunction) {

    if (err instanceof HTTPError) {
        return HTTPResponse({
            res,
            statusCode: err.statusCode,
            message: err.message,
            data: null,
            details: err.details ?? null
        });
    }

    return HTTPResponse({
        res,
        statusCode: 500,
        message: err instanceof Error ? err.message : "Internal server error",
        data: null,
        details: null
    });
}