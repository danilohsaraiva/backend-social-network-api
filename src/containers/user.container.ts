import { UserController } from '../controllers';
import { CryptoHashProvider } from '../providers';
import { TweetRepository, UserRepository } from '../repositories';
import { UserService } from '../services';
import { FollowRepository } from './../repositories/follow.repository';
import { CacheService } from '../infra/cache/cache.service';
import { FollowService } from './../services/follow.service';

const cryptoHashProvider = new CryptoHashProvider();
const userRepository = new UserRepository();
const cacheService = new CacheService();
const followRepository = new FollowRepository(cacheService);
const tweetRepository = new TweetRepository(cacheService);
const followService = new FollowService(userRepository, followRepository);
const userService = new UserService(userRepository, cryptoHashProvider, followRepository, tweetRepository);
const userController = new UserController(userService, followService);

export { userController };

