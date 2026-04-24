import { LoginRequest } from "../interfaces";
import { AuthService } from "../services";
import { HTTPResponse } from '../utils';
import { Response, NextFunction } from 'express'

export class AuthController {
    constructor(
        private authService: AuthService
    ) { }

    public login = async (req: LoginRequest, res: Response, next: NextFunction) => {

        try {
            const { userNickName, password } = req.body;

            const result = await this.authService.authenticateUser({
                userNickName,
                password
            });

            return HTTPResponse({
                res,
                statusCode: 200,
                message: "Loged!",
                data: result
            });

        } catch (error) {
            next(error)
        }
    }
}