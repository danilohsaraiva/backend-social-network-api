import { prismaConnection } from "../config/prisma.client";

export class FollowRepository {
    /**
     * Creates a follow relationship between two users.
     *
     * @param loggedUserId - ID of the authenticated user (follower)
     * @param followingUserId - ID of the user to be followed
     * @returns The created follow relationship
     */
    async create(loggedUserId: string, followingUserId: string) {
        return prismaConnection.follow.create({
            data: {
                followerFk: loggedUserId,
                followingFk: followingUserId
            }
        });
    }

    /**
     * Removes a follow relationship between two users (unfollow).
     *
     * @param loggedUserId - ID of the authenticated user (follower)
     * @param followingUserId - ID of the user to unfollow
     * @returns The result of the delete operation (number of deleted records)
     */
    async delete(loggedUserId: string, followingUserId: string) {
        return prismaConnection.follow.deleteMany({
            where: {
                followerFk: followingUserId,
                followingFk: loggedUserId
            }
        });
    }
}