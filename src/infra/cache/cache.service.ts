import { redis } from "../../config/redis.config";

export class CacheService {

    async get(key: string) {
        const data = await redis.get(key);
        return data ? JSON.parse(data) : null;
    }

    async set(key: string, value: any, ttl: number) {
        await redis.set(key, JSON.stringify(value), "EX", ttl);
    }

    async del(key: string) {
        await redis.del(key);
    }

    async delPattern(pattern: string): Promise<void> {
        const stream = redis.scanStream({
            match: pattern,
            count: 200,
        });

        const pipeline = redis.pipeline();

        return new Promise((resolve, reject) => {
            stream.on("data", (keys: string[]) => {
                if (keys.length) {
                    keys.forEach((key) => pipeline.del(key));
                }
            });

            stream.on("end", async () => {
                await pipeline.exec();
                resolve();
            });

            stream.on("error", reject);
        });
    }
}