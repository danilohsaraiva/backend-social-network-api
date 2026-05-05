import { UserController } from '../controllers';
import { CryptoHashProvider } from '../providers';
import { TweetRepository, UserRepository } from '../repositories';
import { UserService } from '../services';
import { FollowRepository } from './../repositories/follow.repository';
import { FollowService } from './../services/follow.service';

const cryptoHashProvider = new CryptoHashProvider();
const userRepository = new UserRepository();
const followRepository = new FollowRepository();
const tweetRepository = new TweetRepository();
const followService = new FollowService(userRepository, followRepository);
const userService = new UserService(userRepository, cryptoHashProvider, tweetRepository);
const userController = new UserController(userService, followService);

export { userController };

