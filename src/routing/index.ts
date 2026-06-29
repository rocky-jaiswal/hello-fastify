import type { FastifyInstance, FastifyPluginOptions } from 'fastify'

import health from '../handlers/health'
import { getDate, getWeatherForCity } from '../handlers/weather'
import createUser from '../handlers/users/create'
import { getUserById, getAllUsers } from '../handlers/users/get'

const routing = (server: FastifyInstance, _opts: FastifyPluginOptions, done: () => void) => {
  server.get('/health', health)

  server.get('/weather/date', getDate)
  server.get('/weather/:cityName', getWeatherForCity)

  server.post('/users', createUser)
  server.get('/users', getAllUsers)
  server.get('/users/:id', getUserById)

  done()
}

export default routing
