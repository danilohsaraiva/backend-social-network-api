import { User } from '@prisma/client';

import { CryptoHashProvider } from '../providers';
import { UserRepository } from '../repositories';
import { HTTPError } from '../utils';
import { CreateUserDto, ResponseUserDto } from '../dtos/user/user-dto';

export class UserService {

    constructor(
        private userRepository: UserRepository,
        private hashProvider: CryptoHashProvider
    ) { }
    /**
     * Cria um novo usuário no sistema.
     * 
     * @param dto - Dados necessários para criação do usuário
     * @returns Usuário criado no formato de domínio (User)
     */
    public async create(user: CreateUserDto): Promise<ResponseUserDto> {

        const validateUserCredentials = await this.userRepository.findByNickName(user.userNickName);

        if (validateUserCredentials) {
            throw new HTTPError(
                409,
                "User already exists"
            )
        }

        const hashedPassword = await this.hashProvider.hash(user.password);

        if (!hashedPassword || hashedPassword.length === 0) {
            throw new HTTPError(500, 'Error generating password hash');
        }

        const isActive = (user.isActive) ?? true;

        const result: User = await this.userRepository.createUser({
            userName: user.userName,
            userNickName: user.userNickName,
            password: hashedPassword,
            imageUrl: user.imageUrl,
            isActive: isActive
        });

        return this.mapToModel(result);
    }

    public async findByNickName(userNickName: string): Promise<ResponseUserDto | null> {
        if (!userNickName) {
            throw new HTTPError(400, "userNickName is required");
        }

        const result: User | null = await this.userRepository.findByNickName(userNickName);

        if (!result) {
            throw new HTTPError(404, "User not found");
        }

        return this.mapToModel(result);
    }

    public async findById(id: string): Promise<ResponseUserDto> {
        if (!id) {
            throw new HTTPError(401, "id not found");
        }

        const result: User | null = await this.userRepository.findById(id);

        if (!result) {
            throw new HTTPError(404, "User not found");
        }

        return this.mapToModel(result);
    }

    /**
     * Converte a entidade retornada do banco (Prisma) para o modelo de domínio.
     * 
     * @param entity - Usuário vindo do Prisma
     * @returns Instância de User (modelo da aplicação)
     */
    private mapToModel(entity: User): ResponseUserDto {
        return {
            userName: entity.userName,
            userNickName: entity.userNickName,
            imageUrl: entity.imageUrl ?? null,
            isActive: entity.isActive,
            createdAt: entity.createdAt,
            updatedAt: entity.updatedAt
        };
    }
}

