import { Request, Response } from 'express';
import { CreateUserDto } from "../dtos";
import { UserService } from "../services";
import { HTTPResponse } from "../utils";
import { Result } from 'express-validator';

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
    public createUser = async (req: Request, res: Response) => {


        const usarData: CreateUserDto = req.body;

        const result = await this.userService.createUser(usarData);

        return HTTPResponse({
            res,
            statusCode: 201,
            message: "Created",
            data: Result
        })
    }

    // async findUserByEmail(data: LoginDto) {
    //     return prismaConnection.user.findUnique({
    //         where: {
    //             email: data.userNickName
    //         }
    //     })
    // }
}