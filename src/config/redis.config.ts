import * as dotenv from 'dotenv';
dotenv.config();

import Redis from "ioredis";
import { HTTPError } from '../utils';

const urlRedis = process.env.REDIS_URL;

if (!urlRedis) {
    throw new HTTPError(500, "REDIS_URL not defined");
}

export const redis = new Redis(urlRedis);