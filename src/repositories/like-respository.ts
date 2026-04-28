import { Like } from "@prisma/client";
import { prismaConnection } from "../config/prisma.client";

export class LikeRepository {
    public async create(idTweet: string, idCurrentUser: string): Promise<Like> {
        const result = prismaConnection.like.create({
            data: {
                tweetId: idTweet,
                userId: idCurrentUser
            }
        });
        return result;
    }

    public async findById(idTweet: string, idCurrentUser: string): Promise<Like | null> {
        const result = prismaConnection.like.findUnique({
            where: {
                userId_tweetId: {
                    tweetId: idTweet,
                    userId: idCurrentUser
                }
            }
        });

        return result;
    }
}