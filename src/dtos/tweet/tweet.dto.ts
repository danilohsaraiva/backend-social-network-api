export interface CreateTweetDto {
    content: string;
    parentId?: undefined;
}
export interface ReplyTweetDto {
    content: string;
    parentId: string;
}

export interface ResponseTweetDto {
    content: string;
    parentId?: string | null;
    author: {
        userId: string,
        userName: string,
        userNickName: string
    },
    createdAt: Date,
    updatedAt: Date
}
