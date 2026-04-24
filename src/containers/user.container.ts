import { UserController } from '../controllers';
import { CryptoHashProvider } from '../providers';
import { UserRepository } from '../repositories';
import { UserService } from '../services';

const cryptoHashProvider = new CryptoHashProvider();
const userRepository = new UserRepository();
const userService = new UserService(userRepository, cryptoHashProvider);
const userController = new UserController(userService);

export { userController };

