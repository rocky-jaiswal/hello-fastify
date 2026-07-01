import type { FastifyInstance, FastifyPluginOptions } from 'fastify'

import health from '../handlers/health'
import { getDate } from '../handlers/weather'

// v1: only routes that don't require DB or Redis
// getWeatherForCity (Redis), user routes (DB) re-enabled when provisioned
const routing = (server: FastifyInstance, _opts: FastifyPluginOptions, done: () => void) => {
  server.get('/health', health)
  server.get('/weather/date', getDate)

  done()
}

export default routing
