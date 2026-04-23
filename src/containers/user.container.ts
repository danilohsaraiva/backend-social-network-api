import { UserController } from '../controllers';
import { CryptoProvider } from '../providers';
import { UserRepository } from '../repositories';
import { UserService } from '../services';


const cryptoHashProvider = new CryptoProvider();

const userRepository = new UserRepository();
const userService = new UserService(userRepository, cryptoHashProvider);
const userController = new UserController(userService);

export { userController };

