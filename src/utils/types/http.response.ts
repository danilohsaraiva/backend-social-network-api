import { Response } from "express";

interface HTTPResponseProps<T = unknown> {
    res: Response;
    statusCode: number;
    message?: string;
    data?: T;
    details?: unknown;
}

export function HTTPResponse<T>({
    res,
    statusCode,
    message,
    data,
    details,
}: HTTPResponseProps<T>) {

    const success = statusCode >= 200 && statusCode < 300;

    return res.status(statusCode).json({
        success,
        message,
        data,
        details,
    });
}