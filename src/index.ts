import Fastify from 'fastify'
import type { FastifyInstance } from 'fastify'

import routing from './routing'

// Initialize server instance
const server: FastifyInstance = Fastify({ logger: true })

const port = parseInt(process.env.SERVER_PORT ?? '3001')

// Startup
const start = async () => {
  try {
    await server.register(routing, { prefix: '/v1' })
    await server.listen({ port, host: '::' })
  } catch (err) {
    server.log.error({ err })
    process.exit(1)
  }
}

start()
  .then(() => {
    console.log('server started')
  })
  .catch(() => {
    console.error('failed to start server')
  })
