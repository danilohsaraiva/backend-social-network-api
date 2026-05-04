import { NextFunction, Request, Response } from "express";
import { CreateTweetDto, ResponseTweetDto } from "../dtos/tweet/tweet.dto";
import { TweetService } from "../services";
import { HTTPError, HTTPResponse } from "../utils";

export class TweetController {
    constructor(private tweetService: TweetService) { }

    public create = async (req: Request, res: Response, next: NextFunction) => {

        let message = "Create tweet successfully";
        try {

            const currentTweet: CreateTweetDto = {
                content: req.body.content,
                parentId: req.body.parentId
            };

            if (!currentTweet.content) {
                throw new HTTPError(400, "Necessary content for tweet");
            }

            if (currentTweet.parentId) {
                message = "Replay tweet with sucessfully";
            }

            const userId = req.user!.userId;

            const result: ResponseTweetDto = await this.tweetService.create(
                currentTweet,
                userId
            );

            return HTTPResponse({
                res,
                statusCode: 200,
                message: message,
                data: result
            });

        } catch (error) {
            next(error);
        }
    };

    public findReplies = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const currentParentId = req.params.parentId;

            if (Array.isArray(currentParentId)) {
                throw new HTTPError(400, "parentId must not be an array");
            }

            const result = await this.tweetService.findReplyTweets(currentParentId);

            return HTTPResponse({
                res,
                statusCode: 200,
                data: result
            })
        } catch (error) {
            next(error);
        }
    };
}