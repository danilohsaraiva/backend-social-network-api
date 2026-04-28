import { deepStrictEqual } from 'assert';
export interface CreateLikeDto {
    userId: string
    tweetId: string
}

export interface LikeResponseDto {
    likeId: string
    tweetId: string
    createAt: Date
}