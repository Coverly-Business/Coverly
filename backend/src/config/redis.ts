// Basic redis client setup, can be expanded to use ioredis or redis package
// For now, simpler implementation or placeholder as I am not running a real redis server in this environment, 
// but the code should be production ready.

// I will use 'redis' package but user didn't explicitly ask for 'ioredis', 
// but 'redis' (node-redis) is stored in my package.json if I added it?
// Wait, I did not install 'redis' package in my `npm install` command.
// "Caching: Redis". I should install `redis` or `ioredis`. 
// I'll install `redis` and `@types/redis` (or `@redis/client`).

import { createClient } from 'redis';

const redisClient = createClient({
    url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`
});

redisClient.on('error', (err) => console.log('Redis Client Error', err));
redisClient.on('connect', () => console.log('Redis Client Connected'));

export const connectRedis = async () => {
    try {
        await redisClient.connect();
    } catch (error) {
        console.error('Could not connect to Redis', error);
    }
}

export default redisClient;
