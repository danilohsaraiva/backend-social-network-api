import { Like } from "@prisma/client";
import { LikeResponseDto, UnLikeResponseDto } from "../dtos";
import { LikeRepository } from "../repositories/like-respository";
import { HTTPError } from "../utils";

export class LikeService {

    constructor(
        private likeRepository: LikeRepository
    ) { }

    public async like(idTweet: string, idUser: string): Promise<LikeResponseDto> {

        const existingLike = await this.likeRepository.findById(idTweet, idUser);

        if (existingLike) {
            throw new HTTPError(400, "Like already exists");
        }

        const result = await this.likeRepository.create(idTweet, idUser);

        if (!result) {
            throw new HTTPError(400, "Failed to like tweet");
        }

        return this.mapToLikeDto(result);
    }

    public async unLike(idTweet: string, idUser: string): Promise<UnLikeResponseDto> {

        const existingLike = await this.likeRepository.findById(idTweet, idUser);

        if (!existingLike) {
            throw new HTTPError(404, "Like not found");
        }

        const result = await this.likeRepository.delete(idTweet, idUser);

        return this.mapToUnLikeDto(result);
    }

    private mapToLikeDto(entity: Like): LikeResponseDto {
        return {
            likeId: entity.likeId,
            tweetId: entity.tweetId,
            userId: entity.userId,
            createdAt: entity.createdAt
        };
    }
    private mapToUnLikeDto(entity: Like): UnLikeResponseDto {
        return {
            likeId: entity.likeId,
            tweetId: entity.tweetId,
            createdAt: entity.createdAt
        };
    }
}