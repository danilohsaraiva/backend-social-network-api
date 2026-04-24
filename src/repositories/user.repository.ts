import { User } from "@prisma/client";
import { prismaConnection } from "../config/prisma.client";
import { RequestUserDto } from "../dtos/user/request-user-dto";

/**
 * Repository responsável por todas as operações de banco relacionadas a Usuário.
 * 
 * Esta classe abstrai o Prisma e centraliza o acesso à entidade User,
 * evitando que a camada de Service dependa diretamente do ORM.
 */
export class UserRepository {
    /**
     * Cria um novo usuário no banco de dados.
     * 
     * @param data - Dados necessários para criação do usuário (nome, email, senha)
     * @returns Usuário criado retornado pelo Prisma
     */
    async createUser(data: RequestUserDto) {
        return prismaConnection.user.create({
            data
        })
    }

    async findByUserNickName(nickName: string) {
        return prismaConnection.user.findUnique({
            where: {
                userNickName: nickName
            }
        })
    }
}