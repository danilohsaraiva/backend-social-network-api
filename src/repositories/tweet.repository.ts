import { prismaConnection } from "../config/prisma.client";
import { CreateTweetDto } from "../dtos";

export class TweetRepository {
    public create(data: CreateTweetDto, currentUserId: string) {
        return prismaConnection.tweet.create({
            data: {
                content: data.content,
                parentId: data.parentId,
                user: {
                    connect: {
                        userId: currentUserId
                    }
                }
            },
            select: {
                tweetId: true,
                content: true,
                parentId: true,
                createdAt: true,
                updatedAt: true,
                user: {
                    select: {
                        userId: true,
                        userName: true,
                        userNickName: true,
                        imageUrl: true
                    }
                }
            }
        });
    }
}