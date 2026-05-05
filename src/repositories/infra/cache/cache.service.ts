import { redis } from "../../../config/redis.config";

export class CacheService {
    async get(key: string) {
        const data = await redis.get(key);
        return data ? JSON.parse(data) : null;
    }

    async set(key: string, value: any, ttl: number) {
        await redis.set(
            key,
            JSON.stringify(value),
            "EX",
            ttl
        );
    }

    async del(key: string) {
        await redis.del(key);
    }
}