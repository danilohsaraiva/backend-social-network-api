import { LikeController } from "../controllers";
import { LikeRepository } from "../repositories/like-respository";
import { LikeService } from "../services";

const likeRepository = new LikeRepository();
const likeService = new LikeService(likeRepository);
const likeController = new LikeController(likeService);
export { likeController };

