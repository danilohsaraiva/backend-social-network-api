import { NextFunction, Request, Response } from 'express';
import { UserService } from "../services";
import { HTTPError, HTTPResponse } from "../utils";
import { CreateUserDto } from '../dtos/user/user-dto';

/**
 * Repository responsável por todas as operações de banco relacionadas a Usuário.
 * 
 * Esta classe abstrai o Prisma e centraliza o acesso à entidade User,
 * evitando que a camada de Service dependa diretamente do ORM.
 */
export class UserController {
    constructor(private userService: UserService) { }
    /**
     * Cria um novo usuário no banco de dados.
     * 
     * @param data - Dados necessários para criação do usuário (nome, email, senha)
     * @returns Usuário criado retornado pelo Prisma
     */
    public create = async (req: Request, res: Response, next: NextFunction) => {


        try {
            const userData: CreateUserDto = req.body;

            const result = await this.userService.create(userData);

            return HTTPResponse({
                res,
                statusCode: 201,
                message: "Created",
                data: result
            });
        } catch (error) {
            next(error);
        }
    }

    public findById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const idParam = req.params.id;

            if (typeof idParam !== "string") {
                throw new HTTPError(400, "Invalid id")
            }

            const result = await this.userService.findById(idParam);

            return HTTPResponse({
                res,
                statusCode: 200,
                message: "Sucess",
                data: result
            });

        } catch (error) {
            next(error)
        }
    }
}