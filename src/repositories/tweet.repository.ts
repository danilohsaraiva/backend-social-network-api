import { Tweet } from "@prisma/client";
import { prismaConnection } from "../config/prisma.client";
import { CreateTweetDto } from "../dtos";

export class TweetRepository {
    public async findById(id: string): Promise<Tweet | null> {
        return prismaConnection.tweet.findUnique({
            where: {
                tweetId: id
            }
        });
    }

    public async validateId(id: string): Promise<boolean> {
        const validator = await prismaConnection.tweet.findUnique({
            where: {
                tweetId: id
            }
        });

        return validator !== null;
    }

    public create(data: CreateTweetDto, currentUserId: string) {
        return prismaConnection.tweet.create({
            data: {
                content: data.content,
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

    public async findReplyTweet(id: string) {
        return prismaConnection.tweet.findMany({
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
            },
            where: {
                parentId: {
                    not: null
                }
            }
        })
    }
}