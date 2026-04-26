import { NextFunction, Request, Response } from "express";
import { JwtService } from '../services/jwt.service';
import { HTTPResponse } from "../utils";

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
            return HTTPResponse({
                res,
                statusCode: 401,
                message: "Invalid token format. Use: Bearer <token>",
            })
        }

        const token = tokenUtil[1];


        const payload = jwtService.verifyToken(token);

        req.user = payload;

        next()


    } catch (error: any) {
        next(error)
    }
}