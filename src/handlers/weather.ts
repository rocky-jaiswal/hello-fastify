import { delay } from '@rockyj/async-utils'
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

export const getWeatherForCity = async (request: FastifyRequest, response: FastifyReply) => {
  try {
    const maxTemp = Math.ceil((Math.random() * 100) % 40)
    const minTemp = maxTemp - Math.ceil((Math.random() * 100) % 12)

    await delay(3000)

    await response.send({
      maxTemp,
      minTemp,
      cityName: (request.params as Record<string, string>).cityName
    })
  } catch (e) {
    request.log.error('error in getWeatherForCity')
    request.log.error(e)
    await response.code(500).send({ error: 'error in getWeatherForCity' })
  }
}
