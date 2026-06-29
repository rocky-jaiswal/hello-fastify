import { Pool } from 'pg'
import Redis from 'ioredis'

export const db = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 10
})

export const redis = new Redis(process.env.REDIS_URL ?? 'redis://localhost:6379', {
  lazyConnect: true
})

export const connect = async () => {
  await db.connect()
  await redis.connect()
}

export const disconnect = async () => {
  await db.end()
  await redis.quit()
}
