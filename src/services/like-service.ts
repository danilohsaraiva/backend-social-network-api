import { Like } from "@prisma/client";
import { LikeResponseDto } from "../dtos";
import { LikeRepository } from "../repositories/like-respository";
import { HTTPError } from "../utils";

export class LikeService {

    constructor(
        private likeRepository: LikeRepository
    ) { }

    public async like(idTweet: string, idUser: string): Promise<LikeResponseDto> {

        const existingLike = await this.likeRepository.findById(idTweet, idUser);

        if (existingLike) {
            throw new HTTPError(400, "Like alwary exist!");
        }

        const result = await this.likeRepository.create(idTweet, idUser);

        if (!result) {
            throw new HTTPError(400, "Failed to like tweet");
        }
        return this.mapToModel(result);
    }

    public mapToModel(entity: Like): LikeResponseDto {
        return {
            likeId: entity.likeId,
            tweetId: entity.tweetId,
            createAt: entity.createdAt
        }
    }
}