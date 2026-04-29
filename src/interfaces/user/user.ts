import { Tweet } from "@prisma/client"

export interface UserQueryRelations {
    //Traz relacionamento User + tweets + seguidores
    userId: string,
    userName: string,
    userNickName: string,
    imageUrl?: string | null,
    isActive: boolean,
    createdAt: Date,
    updatedAt: Date,

    tweets: Tweet[],

    followers: {
        follower: {
            userId: string,
            userName: string
        }
    }[];
}