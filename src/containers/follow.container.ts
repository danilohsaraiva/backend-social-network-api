import { FollowRepository } from './../repositories/follow.repository';
import { UserRepository } from "../repositories";
import { FollowService } from '../services/follow.service';

const userRepository = new UserRepository;
const followRepository = new FollowRepository;

const followService = new FollowService(userRepository, followRepository);

export { followService }