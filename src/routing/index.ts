import type { FastifyInstance, FastifyPluginOptions } from 'fastify'

import { getDate, getWeatherForCity } from '../handlers/weather'

// eslint-disable-next-line @typescript-eslint/ban-types
const routing = (server: FastifyInstance, _opts: FastifyPluginOptions, done: Function) => {
  server.get('/weather/date', getDate)
  server.get('/weatherByCity/:cityName', getWeatherForCity)

  done()
}

export default routing
