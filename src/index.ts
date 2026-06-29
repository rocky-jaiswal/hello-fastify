import 'dotenv/config'

import Fastify from 'fastify'
import type { FastifyInstance } from 'fastify'

import routing from './routing'
import { registry } from './metrics'
import redis from './repositories/redis'

const server: FastifyInstance = Fastify({ logger: true })

const port = parseInt(process.env.SERVER_PORT ?? '3001')

server.get('/metrics', async (_req, reply) => {
  reply.header('Content-Type', registry.contentType)
  return registry.metrics()
})

const start = async () => {
  try {
    await redis.connect()
    await server.register(routing, { prefix: '/v1' })
    await server.listen({ port, host: '::' })
  } catch (err) {
    server.log.error({ err })
    process.exit(1)
  }
}

start()
  .then(() => server.log.info('server started'))
  .catch(() => server.log.error('failed to start server'))
