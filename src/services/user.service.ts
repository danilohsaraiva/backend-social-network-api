import { User } from '@prisma/client';
import { ResponseUserDto } from '../dtos';
import { CryptoHashProvider } from '../providers';
import { UserRepository } from '../repositories';
import { HTTPError } from '../utils';
import { RequestUserDto } from './../dtos/user/request-user-dto';

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
    public async createUser(user: RequestUserDto): Promise<ResponseUserDto> {

        const validateUserCredentials = await this.userRepository.findByUserNickName(user.userNickName);

        if (validateUserCredentials) {
            throw new HTTPError(
                409,
                "User already exist"
            )
        }

        const hashedPassword = await this.hashProvider.hash(user.password);

        if (!hashedPassword || hashedPassword.length === 0) {
            throw new HTTPError(500, 'Error generating password hash');
        }

        const isActive = (user.isActive) ? user.isActive : true;

        const result: User = await this.userRepository.createUser({
            userName: user.userName,
            userNickName: user.userNickName,
            password: hashedPassword,
            imageUrl: user.imageUrl ?? null,
            isActive: isActive
        });

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
            isActive: entity.isActive ?? true,
            createdAt: entity.createdAt,
            updatedAt: entity.updatedAt
        };
    }
}

