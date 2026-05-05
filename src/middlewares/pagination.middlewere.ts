import { Request, Response, NextFunction } from "express";

export function paginationMiddleware(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const page = Number(req.query.page ?? 1);
    const limit = Number(req.query.limit ?? 10);

    req.pagination = {
        page: page > 0 ? page : 1,
        limit: Math.min(limit > 0 ? limit : 10, 50),
    };

    next();
}