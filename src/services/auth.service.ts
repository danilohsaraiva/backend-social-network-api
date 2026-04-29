import { User } from '@prisma/client';
import { AuthReponseDto, LoginDto } from '../dtos/auth/auth-dto';
import { CryptoHashProvider } from '../providers/crypto-hash.provider';
import { UserRepository } from "../repositories";
import { HTTPError } from '../utils';
import { JwtService } from './jwt.service';

export class AuthService {
    constructor(
        private userRepository: UserRepository,
        private jwtService: JwtService,
        private cryptoProvider: CryptoHashProvider
    ) { }

    public async authenticateUser(data: LoginDto) {

        const currentUser = await this.userRepository.findByNickName(data.userNickName);

        if (!currentUser) {
            throw new HTTPError(404, 'User not found');
        }

        const isPasswordValid = await this.cryptoProvider.compare(data.password, currentUser.password);

        if (!isPasswordValid) {
            throw new HTTPError(401, 'Invalid credentials');
        }

        const secret = process.env.JWT_SECRET;
        const expiresIn = process.env.JWT_EXPIRES_IN;

        if (!secret || !expiresIn) {
            throw new Error(
                "Environment variables JWT_SECRET and JWT_EXPIRES_IN must be configured.",
            );
        }

        const token = this.jwtService.createToken({
            userId: currentUser.userId
        });

        return {
            token,
            user: this.mapToModel(currentUser)
        }
    }

    private mapToModel(currentUser: User): AuthReponseDto {
        return {
            userId: currentUser.userId,
            userName: currentUser.userName,
            userNickName: currentUser.userNickName,
            isActive: currentUser.isActive,
            createdAt: currentUser.createdAt,
            updatedAt: currentUser.updatedAt
        }
    }
}