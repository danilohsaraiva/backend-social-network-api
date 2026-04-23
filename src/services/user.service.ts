import { User } from '@prisma/client';
import { CreateUserDto } from '../dtos';
import { CryptoProvider } from '../providers';
import { UserRepository } from '../repositories';
// import { CreateUserDto } from '../dtos';
// import { UserRepository } from '../repositories';

/**
 * Service responsável pelas regras de negócio relacionadas a Usuário.
 * 
 * Camada intermediária entre Controller e Repository.
 * Responsável por:
 * - Criação de usuário
 * - Hash de senha
 * - Mapeamento de entidade
 */
export class UserService {

    constructor(
        private userRepository: UserRepository,
        private hashProvider: CryptoProvider
    ) { }
    /**
     * Cria um novo usuário no sistema.
     * 
     * @param dto - Dados necessários para criação do usuário
     * @returns Usuário criado no formato de domínio (User)
     */
    public async createUser(user: CreateUserDto): Promise<User> {


        const hashedPassword = await this.hashProvider.hash(user.password)

        const newUser = await this.userRepository.createUser(user);

        return this.mapToModel(newUser);
    }

    /**
     * Converte a entidade retornada do banco (Prisma) para o modelo de domínio.
     * 
     * @param entity - Usuário vindo do Prisma
     * @returns Instância de User (modelo da aplicação)
     */
    private mapToModel(entity: User): User {
        const currentUser: User = {
            userId: entity.userId,
            userName: entity.userName,
            userNickName: entity.userNickName,
            password: entity.password,
            imageUrl: entity.imageUrl,
            isActive: true,
            createdAt: entity.createdAt,
            updatedAt: entity.updatedAt
        }

        return currentUser;
    };
}

