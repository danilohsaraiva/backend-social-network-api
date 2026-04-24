import { AuthController } from "../controllers";
import { UserRepository } from "../repositories";
import { AuthService } from "../services";
import { CryptoHashProvider } from './../providers/crypto-hash.provider';
import { JwtService } from './../services/jwt.service';

const cryptoHashProvider = new CryptoHashProvider();
const userRepository = new UserRepository();
const jwtService = new JwtService();
const authService = new AuthService(userRepository, jwtService, cryptoHashProvider);
const authController = new AuthController(authService);

export { authController };

