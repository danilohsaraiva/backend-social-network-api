import { CryptoHashProvider } from '../providers/crypto-hash.provider';
import { JwtService } from './jwt.service';
import { UserRepository } from "../repositories";
import { LoginDto } from '../dtos';
import { HTTPError } from '../utils';
import { User } from '@prisma/client';
import { AuthReponseDto } from '../dtos/auth/auth-response-dto';

export class AuthService {
    constructor(
        private userRepository: UserRepository,
        private jwtService: JwtService,
        private cryptoProvider: CryptoHashProvider
    ) { }

    public async authenticateUser(data: LoginDto) {

        const currentUser = await this.userRepository.findByUserNickName(data.userNickName);

        if (!currentUser) {
            throw new HTTPError(401, 'Invalid credentials');
        }

        const isPasswordValid = await this.cryptoProvider.compare(data.password, currentUser.password);
        console.log(data.password);
        console.log(currentUser.password)
        console.log(isPasswordValid)

        if (!isPasswordValid) {
            throw new HTTPError(401, 'Password invalid');
        }

        const secret = process.env.JWT_SECRET;
        const expiresIn = process.env.JWT_EXPIRES_IN;

        if (!secret || !expiresIn) {
            throw new Error(
                'As variáveis de ambiente JWT_SECRET e JWT_EXPIRES_IN devem estar configuradas.',
            );
        }

        const token = this.jwtService.createToken({
            id: currentUser.userId,
            username: currentUser.userNickName
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