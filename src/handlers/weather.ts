import type { FastifyReply, FastifyRequest } from 'fastify'

export const getDate = async (request: FastifyRequest, response: FastifyReply) => {
  try {
    await response.send({ date: new Date() })
  } catch (e) {
    request.log.error('error in getDate')
    request.log.error(e)
    await response.code(500).send({ error: 'error in getDate' })
  }
}
