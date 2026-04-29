import { Tweet, User } from "@prisma/client";

export interface CreateUserDto {
    userName: string,
    userNickName: string,
    password: string,
    imageUrl?: string | null
    isActive?: boolean
}

export interface ResponseUserDto {
    userName: string,
    userNickName: string,
    imageUrl?: string | null
    isActive: boolean
    createdAt: Date;
    updatedAt: Date;

    tweets?: Tweet[],
    followers?: User[]
}

export interface UserWithProfile {
    userId: string,
    userName: string,
    imageUrl: string | null,
    createdAt: Date,
    updatedAt: Date,
    isActive: boolean

    tweets: Tweet[],

    following: {
        following: {
            userId: string,
            userName: string
        }
    }[]
}

export interface UserProfileResponseDto {
    userId: string,
    userName: string,
    imageUrl: string | null,
    updatedAt: Date,
    tweets: {
        tweetId: string,
        content: string
    }[],

    following: {
        userId: string,
        userName: string
    }[]
}