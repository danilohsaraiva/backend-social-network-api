import { prismaConnection } from "../config/prisma.client";

export class FollowRepository {
    async create(loggedUserId: string, followingUserId: string) {
        return prismaConnection.follow.create({
            data: {
                followerFk: loggedUserId,
                followingFk: followingUserId
            }
        })
    }
}