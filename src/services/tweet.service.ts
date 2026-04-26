import { CreateTweetDto } from '../dtos/tweet/tweet.dto';
import { ResponseTweetDto } from './../dtos/tweet/tweet.dto';
import { TweetRepository } from './../repositories/tweet.repository';

type TweetWithUser = {
    tweetId: string;
    content: string;
    parentId: string | null;
    createdAt: Date;
    updatedAt: Date;
    user: {
        userId: string;
        userName: string;
        userNickName: string;
    };
};

export class TweetService {
    constructor(
        private tweetRepository: TweetRepository
    ) { }

    public async create(data: CreateTweetDto, userId: string): Promise<ResponseTweetDto> {

        const result = await this.tweetRepository.create(data, userId);

        return this.mapToModel(result);
    }

    public mapToModel(entity: TweetWithUser): ResponseTweetDto {
        return {
            content: entity.content,
            parentId: entity.parentId,
            createdAt: entity.createdAt,
            updatedAt: entity.updatedAt,
            author: {
                userId: entity.user.userId,
                userName: entity.user.userName,
                userNickName: entity.user.userNickName
            }

        }
    }
}