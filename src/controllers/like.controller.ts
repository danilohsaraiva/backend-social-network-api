import { NextFunction, Request, Response } from "express";
import { LikeService } from "../services";
import { HTTPError, HTTPResponse } from "../utils";

export class LikeController {
    constructor(
        private likeService: LikeService
    ) { }
    public like = async (req: Request, res: Response, next: NextFunction) => {
        try {
            //Manipular recursos HTTP
            const currentTweetId = req.params.id;

            if (Array.isArray(currentTweetId)) {
                throw new HTTPError(400, "tweetId must not be an array");
            }
            const currentUserId = req.user?.userId as string;


            const result = await this.likeService.like(currentTweetId, currentUserId);

            return HTTPResponse({
                res,
                statusCode: 200,
                message: "Liked!",
                data: result
            })
        } catch (error) {
            next(error);
        }
    }
}