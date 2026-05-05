import { prismaConnection } from "../config/prisma.client";
import { cacheService } from "../containers";
import { CACHE_KEYS } from "../infra";

export class FollowRepository {

    /**
     * Creates a follow relationship between two users.
     *
     * @param loggedUserId - ID of the authenticated user (follower)
     * @param followingUserId - ID of the user to be followed
     * @returns The created follow relationship
     */
    async create(loggedUserId: string, followingUserId: string) {
        const currentFollow = await prismaConnection.follow.create({
            data: {
                followerFk: followingUserId,
                followingFk: loggedUserId
            }
        });

        await cacheService.del(CACHE_KEYS.USER(followingUserId));
        await cacheService.del(CACHE_KEYS.USER(loggedUserId));
        await cacheService.del(`timeline:${followingUserId}:*`);
        await cacheService.del(`timeline:${loggedUserId}:*`);

        return currentFollow;
    }

    /**
     * Removes a follow relationship between two users (unfollow).
     *
     * @param loggedUserId - ID of the authenticated user (follower)
     * @param followingUserId - ID of the user to unfollow
     * @returns The result of the delete operation (number of deleted records)
     */
    async delete(loggedUserId: string, unfollowingUserId: string) {
        const currentUnfollow = await prismaConnection.follow.deleteMany({
            where: {
                followerFk: loggedUserId,
                followingFk: unfollowingUserId
            }
        });

        await cacheService.del(CACHE_KEYS.USER(unfollowingUserId));
        await cacheService.del(CACHE_KEYS.USER(loggedUserId));

        return currentUnfollow;
    }

    async validateFollow(loggedUserId: string, followingUserId: string) {
        return prismaConnection.follow.findUnique({
            where: {
                followerFk_followingFk: {
                    followerFk: loggedUserId,
                    followingFk: followingUserId
                }
            }
        })
    }
}