export interface CreateLikeDto {
    userId: string
    tweetId: string
}

export interface LikeResponseDto {
    userId: string
    likeId: string
    tweetId: string
    createdAt: Date
}

export interface UnLikeResponseDto {
    likeId: string
    tweetId: string
    createdAt: Date
}