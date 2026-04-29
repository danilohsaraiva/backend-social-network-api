import { prismaConnection } from "../config/prisma.client";
import { CreateUserDto } from "../dtos";
import { UserQueryRelations } from "../interfaces";
import { UserWithProfile } from './../dtos/user/user-dto';

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
    async createUser(data: CreateUserDto) {
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

    async findById(id: string): Promise<UserQueryRelations | null> {
        const currenteUserRelationship = await prismaConnection.user.findUnique({
            where: { userId: id },
            select: {
                userId: true,
                userName: true,
                userNickName: true,
                imageUrl: true,
                isActive: true,
                createdAt: true,
                updatedAt: true,

                tweets: true,

                followers: {
                    select: {
                        follower: {
                            select: {
                                userId: true,
                                userName: true
                            }
                        }
                    }
                }
            }
        });
        return currenteUserRelationship;
    }

    async findProfileById(id: string): Promise<UserWithProfile | null> {

        const currentUser = await prismaConnection.user.findUnique({
            where: {
                userId: id
            },
            include: {
                tweets: true,
                following: {
                    include: {
                        following: true
                    }
                }
            }
        });

        return currentUser;
    }
}