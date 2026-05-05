import { TweetController } from "../controllers";
import { TweetService } from "../services";
import { CacheService } from './../repositories/infra/cache/cache.service';
import { TweetRepository } from './../repositories/tweet.repository';

const cacheService = new CacheService();
const tweetRepository = new TweetRepository(cacheService);
const tweetService = new TweetService(tweetRepository);
const tweetController = new TweetController(tweetService);

export { tweetController };
