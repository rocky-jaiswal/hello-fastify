import type { FastifyRequest, FastifyReply } from 'fastify'
import DB from '../../repositories/db'
import redis from '../../repositories/redis'

const health = async (_request: FastifyRequest, response: FastifyReply) => {
  try {
    await DB.raw('SELECT 1')
    await redis.ping()
    await response.send({ status: 'ok' })
  } catch (e) {
    await response.code(503).send({ status: 'error' })
  }
}

export default health
