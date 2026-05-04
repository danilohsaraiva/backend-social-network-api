import { UserController } from '../controllers';
import { CryptoHashProvider } from '../providers';
import { TweetRepository, UserRepository } from '../repositories';
import { UserService } from '../services';
import { FollowRepository } from './../repositories/follow.repository';

const cryptoHashProvider = new CryptoHashProvider();
const userRepository = new UserRepository();
const followRepository = new FollowRepository();
const tweetRepository = new TweetRepository();
const userService = new UserService(userRepository, cryptoHashProvider, followRepository, tweetRepository);
const userController = new UserController(userService);

export { userController };

