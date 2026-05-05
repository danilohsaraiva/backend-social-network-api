import { Follow } from '@prisma/client';
import { UserRepository } from '../repositories';
import { HTTPError } from "../utils";
import { FollowRepository } from './../repositories/follow.repository';

export class FollowService {
    constructor(
        private userRepository: UserRepository,
        private followRepository: FollowRepository
    ) {

    }

    /**
     * Creates a follow relationship between the authenticated user and another user.
     *
     * This method first validates if the target user exists.
     * If the user exists, it creates a follow relationship in the database.
     *
     * @param loggedUserId - ID of the authenticated user (follower)
     * @param followinUserId - ID of the user to be followed
     * @throws HTTPError 404 - If the target user does not exist
     * @throws HTTPError 500 - If the follow creation fails unexpectedly
     * @returns The created follow relationship
     */
    public async follow(loggedUserId: string, followinUserId: string): Promise<Follow> {

        const validateUser = await this.userRepository.findById(followinUserId);

        if (!validateUser) {
            throw new HTTPError(404, "User to follow not found");
        }

        if (loggedUserId === followinUserId) {
            throw new HTTPError(400, "You cannot follow yourself");
        }

        const alreadyFollowing = await this.followRepository.validateFollow(loggedUserId, followinUserId);
        if (alreadyFollowing) {
            throw new HTTPError(400, "You already following the user!");
        }

        const result: Follow = await this.followRepository.create(loggedUserId, followinUserId);

        if (!result) {
            throw new HTTPError(500, "Internal server error");
        }

        return result;
    }
}