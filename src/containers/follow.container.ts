import { FollowRepository } from './../repositories/follow.repository';
import { UserRepository } from "../repositories";
import { FollowService } from '../services/follow.service';
import { CacheService } from '../repositories/infra';

const userRepository = new UserRepository();
const cacheService = new CacheService();
const followRepository = new FollowRepository(cacheService);

const followService = new FollowService(userRepository, followRepository);

export { followService }