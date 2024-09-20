import type { FastifyInstance, FastifyPluginOptions } from 'fastify'

import { getDate, getWeatherForCity } from '../handlers/weather'

const routing = (server: FastifyInstance, _opts: FastifyPluginOptions, done: () => void) => {
  server.get('/weather/date', getDate)
  server.get('/weatherByCity/:cityName', getWeatherForCity)

  done()
}

export default routing
