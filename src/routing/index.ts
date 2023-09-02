import type { FastifyInstance, FastifyPluginOptions } from 'fastify'

import { getDate } from '../handlers/weather'

// eslint-disable-next-line @typescript-eslint/ban-types
const routing = (server: FastifyInstance, _opts: FastifyPluginOptions, done: Function) => {
  server.get('/weather/date', getDate)

  done()
}

export default routing
