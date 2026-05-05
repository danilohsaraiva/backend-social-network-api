import { TweetController } from "../controllers";
import { TweetService } from "../services";
import { TweetRepository } from './../repositories/tweet.repository';

const tweetRepository = new TweetRepository();
const tweetService = new TweetService(tweetRepository);
const tweetController = new TweetController(tweetService);

export { tweetController };

