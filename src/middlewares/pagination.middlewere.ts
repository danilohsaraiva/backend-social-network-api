import { Request, Response, NextFunction } from "express";

export function paginationMiddleware(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const pageRaw = Number(req.query.page);
    const limitRaw = Number(req.query.limit);

    const page =
        Number.isFinite(pageRaw) && pageRaw > 0 ? pageRaw : 1;

    const limit =
        Number.isFinite(limitRaw) && limitRaw > 0
            ? Math.min(limitRaw, 50)
            : 10;

    req.pagination = {
        page,
        limit,
    };

    next();
}