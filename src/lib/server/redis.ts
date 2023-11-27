import Redis from "ioredis";
import { REDIS_URL } from "$env/static/private";

export default REDIS_URL ? new Redis(REDIS_URL) : new Redis();
