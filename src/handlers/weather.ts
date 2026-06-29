import type { FastifyReply, FastifyRequest } from 'fastify'
import redis from '../repositories/redis'

const CACHE_TTL_SECONDS = 60

export const getDate = async (_request: FastifyRequest, response: FastifyReply) => {
  await response.send({ date: new Date() })
}

export const getWeatherForCity = async (request: FastifyRequest, response: FastifyReply) => {
  try {
    const cityName = (request.params as Record<string, string>).cityName
    const cacheKey = `weather:${cityName}`

    const cached = await redis.get(cacheKey)
    if (cached) {
      return await response.send({ ...JSON.parse(cached), cached: true })
    }

    const maxTemp = Math.ceil((Math.random() * 100) % 40)
    const minTemp = maxTemp - Math.ceil((Math.random() * 100) % 12)
    const result = { maxTemp, minTemp, cityName }

    await redis.setex(cacheKey, CACHE_TTL_SECONDS, JSON.stringify(result))

    await response.send({ ...result, cached: false })
  } catch (e) {
    request.log.error(e)
    await response.code(500).send({ error: 'error in getWeatherForCity' })
  }
}
