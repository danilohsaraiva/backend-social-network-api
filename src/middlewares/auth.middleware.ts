import { NextFunction, Request, Response } from "express";
import { JwtService } from '../services/jwt.service';
import { HTTPError, HTTPResponse } from "../utils";

const jwtService = new JwtService();

export const checkAuth = (req: Request, res: Response, next: NextFunction) => {
    try {

        const { authorization } = req.headers;


        if (!authorization) {
            return HTTPResponse({
                res,
                statusCode: 401,
                message: "Token is missing"
            });
        }

        const tokenUtil = authorization.split(' ');

        if (tokenUtil.length !== 2 || tokenUtil[0] !== 'Bearer') {
            throw new HTTPError(401, "Invalid format. Use: Bearer <token>");
        }

        const token = tokenUtil[1];

        const payload = jwtService.verifyToken(token);
        if (payload === null) {
            return HTTPResponse({
                res,
                statusCode: 401,
                message: "Invalid current token"
            });
        }
    } catch (error: any) {
        return new HTTPError(500, "Internal error", error.toString());
    }
}