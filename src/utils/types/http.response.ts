import { Response } from "express";

interface HTTPResponseProps<T = unknown> {
    res: Response;
    statusCode: number;
    message?: string;
    data?: T;
    details?: unknown;
}
/**
 * Utility function to standardize HTTP responses in the API.
 * 
 * This helper ensures all responses follow a consistent structure,
 * including success status, message, optional data, and optional error details.
 * 
 * @template T - Type of the response payload (data)
 * 
 * @param res - Express Response object used to send the HTTP response
 * @param statusCode - HTTP status code (e.g., 200, 201, 400, 500)
 * @param message - Human-readable message describing the response
 * @param data - Optional response payload (generic type)
 * @param details - Optional additional information, usually used for errors or validations
 * 
 * @returns JSON response with standardized structure:
 * {
 *   success: boolean,
 *   message: string,
 *   data?: T,
 *   details?: any
 */

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