import { NextFunction, Request, Response } from "express";
import { HTTPError } from "../utils";

export function errorMiddleware(err: unknown, req: Request, res: Response, next: NextFunction) {

    if (err instanceof HTTPError) {

        return res.status(err.statusCode).json({
            message: err.message,
            details: err.details ?? null
        });
    }

    return res.status(500).json({
        message: err instanceof Error ? err.message : "Internal server error",
        details: null
    });
}