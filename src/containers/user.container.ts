import { UserController } from '../controllers';
import { CryptoHashProvider } from '../providers';
import { UserRepository } from '../repositories';
import { UserService } from '../services';
import { FollowRepository } from './../repositories/follow.repository';

const cryptoHashProvider = new CryptoHashProvider();
const userRepository = new UserRepository();
const followRepository = new FollowRepository();
const userService = new UserService(userRepository, cryptoHashProvider, followRepository);
const userController = new UserController(userService);

export { userController };

