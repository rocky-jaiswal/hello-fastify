import type { FastifyRequest, FastifyReply } from 'fastify'

// v1: simplified health check — DB and Redis checks added back when provisioned
const health = async (_request: FastifyRequest, response: FastifyReply) => {
  await response.send({ status: 'ok' })
}

export default health
