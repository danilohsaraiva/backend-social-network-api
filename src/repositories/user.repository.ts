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

    async findByNickName(userNickName: string) {
        return prismaConnection.user.findUnique({
            where: {
                userNickName: userNickName
            }
        })
    }


    async findById(id: string) {
        return prismaConnection.user.findUnique({
            where: {
                userId: id
            }
        })
    }
}