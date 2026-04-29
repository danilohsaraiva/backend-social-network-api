import { Follow, User } from '@prisma/client';
import { CreateUserDto, ResponseUserDto, UserProfileResponseDto, UserWithProfile } from '../dtos/user/user-dto';
import { CryptoHashProvider } from '../providers';
import { FollowRepository, UserRepository } from '../repositories';
import { HTTPError } from '../utils';
import { UserQueryRelations } from '../interfaces';

export class UserService {

    constructor(
        private userRepository: UserRepository,
        private hashProvider: CryptoHashProvider,
        private followRespository: FollowRepository
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

        return this.mapToResponseUserDto(result);
    }

    public async findByNickName(userNickName: string): Promise<ResponseUserDto | null> {
        if (!userNickName) {
            throw new HTTPError(400, "userNickName is required");
        }

        const result: User | null = await this.userRepository.findByNickName(userNickName);

        if (!result) {
            throw new HTTPError(404, "User not found");
        }

        return this.mapToResponseUserDto(result);
    }

    public async findById(id: string): Promise<ResponseUserDto> {

        const result: UserQueryRelations | null = await this.userRepository.findById(id);

        if (!result) {
            throw new HTTPError(404, "User not found");
        }

        return this.mapToResponseUserDto(result);
    }

    /**
     * Creates a follow relationship between the authenticated user and another user.
     *
     * This method first validates if the target user exists.
     * If the user exists, it creates a follow relationship in the database.
     *
     * @param loggedUserId - ID of the authenticated user (follower)
     * @param followinUserId - ID of the user to be followed
     * @throws HTTPError 404 - If the target user does not exist
     * @throws HTTPError 500 - If the follow creation fails unexpectedly
     * @returns The created follow relationship
     */
    public async follow(loggedUserId: string, followinUserId: string): Promise<Follow> {

        const validateUser: ResponseUserDto | null = await this.findById(followinUserId);

        if (!validateUser) {
            throw new HTTPError(404, "User not found");
        }

        const result: Follow = await this.followRespository.create(loggedUserId, followinUserId);

        if (!result) {
            throw new HTTPError(500, "Internal server error");
        }

        return result;
    }

    /**
     * Removes a follow relationship between the authenticated user and another user (unfollow).
     *
     * This method first validates if the target user exists.
     * Then it attempts to remove the follow relationship from the database.
     * If no relationship is found, a 404 error is thrown.
     *
     * @param loggedUserId - ID of the authenticated user (follower)
     * @param followinUserId - ID of the user to unfollow
     * @throws HTTPError 404 - If the target user does not exist
     * @throws HTTPError 404 - If no follow relationship exists between the users
     * @returns The result of the delete operation (number of deleted records)
     */
    public async unfollow(loggedUserId: string, followinUserId: string) {

        const validateUser: ResponseUserDto | null = await this.findById(followinUserId);

        if (!validateUser) {
            throw new HTTPError(404, "User not found");
        }

        const result = await this.followRespository.delete(loggedUserId, followinUserId);

        if (result.count === 0) {
            throw new HTTPError(404, "Follow relationship not found");
        }

        return result;
    }

    public async findProfileById(id: string) {
        const currentUser = await this.userRepository.findProfileById(id);

        if (!currentUser) {
            throw new HTTPError(404, "User not found")
        }

        return this.mapProfileToModel(currentUser);
    }

    /**
     * Converte a entidade retornada do banco (Prisma) para o modelo de domínio.
     * 
     * @param entity - Usuário vindo do Prisma
     * @returns Instância de User (modelo da aplicação)
     */
    private mapToResponseUserDto(entity: {
        userName: string,
        userNickName: string,
        imageUrl?: string | null,
        isActive: boolean,
        createdAt: Date,
        updatedAt: Date

        tweets?: any[];
        followers?: any[];
    }): ResponseUserDto {
        return {
            userName: entity.userName,
            userNickName: entity.userNickName,
            imageUrl: entity.imageUrl ?? null,
            isActive: entity.isActive,
            createdAt: entity.createdAt,
            updatedAt: entity.updatedAt,

            tweets: entity.tweets ?? [],
            followers: entity.followers
                ? entity.followers.map(f => f.follower)
                : []
        };
    }

    private mapProfileToModel(entity: UserWithProfile): UserProfileResponseDto {
        return {
            userId: entity.userId,
            userName: entity.userName,
            imageUrl: entity.imageUrl,
            updatedAt: entity.updatedAt,

            following: entity.following.map(f => f.following),
            tweets: entity.tweets
        }
    }
}

