import { UserRepository } from "../repositories";
import { CacheService } from '../infra';
import { FollowService } from '../services/follow.service';
import { FollowRepository } from './../repositories/follow.repository';

const userRepository = new UserRepository();
const cacheService = new CacheService();
const followRepository = new FollowRepository(cacheService);
const followService = new FollowService(userRepository, followRepository);

export { followService };
