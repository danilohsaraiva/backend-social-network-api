import { NextFunction, Request, Response } from "express";
import { CreateTweetDto, ResponseTweetDto } from "../dtos/tweet/tweet.dto";
import { TweetService } from "../services";
import { HTTPError, HTTPResponse } from "../utils";

export class TweetController {
    constructor(private tweetService: TweetService) { }

    public create = async (req: Request, res: Response, next: NextFunction) => {
        let message = "Create tweet successfully";
        try {

            const curretTweet: CreateTweetDto = req.body;

            if (curretTweet.parentId) {
                message = "Replay tweet with sucessfully"
            }

            if (!curretTweet) {
                throw new HTTPError(400, "Necessary tweet");
            }

            const userId = req.user!.userId;

            const result: ResponseTweetDto = await this.tweetService.create(
                curretTweet,
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
}