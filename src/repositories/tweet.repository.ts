import { Tweet } from "@prisma/client";
import { prismaConnection } from "../config/prisma.client";
import { CreateTweetDto } from "../dtos";
import { CACHE_KEYS, CacheService } from "./infra";

export class TweetRepository {
    constructor(
        private cacheService: CacheService
    ) {

    }

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

        const currentTweet = await prismaConnection.tweet.create({
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

        await this.cacheService.del(CACHE_KEYS.TIMELINE(currentUserId));

        return currentTweet;
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
    };

    /**
     * 
     * @param userId 
     * @returns List of tweet's user and tweets of your followings
     */
    async showTimeLineById(userId: string) {

        const cacheKey = CACHE_KEYS.TIMELINE(userId);

        const data = await this.cacheService.get(cacheKey);
        if (data) {
            console.log("🔥 CACHE HIT");
            return data;
        }

        const timeLineTweets = await prismaConnection.tweet.findMany({
            where: {
                parentId: null,
                OR: [
                    {
                        userFk: userId
                    },
                    {
                        user: {
                            following: {
                                some: {
                                    followingFk: userId
                                }
                            }
                        }
                    }
                ]
            },
            orderBy: {
                createdAt: 'desc'
            },
            include: {
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

        this.cacheService.set(
            cacheKey,
            timeLineTweets,
            60
        );

        console.log("CACHE HIT");
        return timeLineTweets;
    }
}