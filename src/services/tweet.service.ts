import { CreateTweetDto } from '../dtos/tweet/tweet.dto';
import { HTTPError } from '../utils';
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

        if (!data.content) {
            throw new HTTPError(400, "Content is request")
        }

        if (data.parentId) {
            if (!(await this.tweetRepository.validateId(data.parentId))) {
                throw new HTTPError(400, "Tweet ID reference does not exist in the database");
            } else {
                const replayTweet = await this.tweetRepository.create(data, userId);
                return this.mapToModel(replayTweet);
            }
        }

        const latestTweet = await this.tweetRepository.create(data, userId);
        return this.mapToModel(latestTweet);

    }

    public async findReplyTweets(parentId: string) {
        let replies = await this.tweetRepository.findReplies(parentId);

        return replies.map(r => this.mapToModel(r));
    }

    public mapToModel(entity: TweetWithUser): ResponseTweetDto {
        return {
            content: entity.content,
            parentId: entity.parentId ?? null,
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