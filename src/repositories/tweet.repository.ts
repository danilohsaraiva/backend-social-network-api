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

    public async create(data: CreateTweetDto, currentUserId: string) {


        return prismaConnection.tweet.create({
            data: {
                content: data.content,
                parentId: data.parentId ?? null,
                userFk: currentUserId,
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

    public async findReplies(parentId: string) {

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
                parentId: parentId
            }
        })
    }
}