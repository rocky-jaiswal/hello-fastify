import { EitherAsync, Right } from 'purify-ts'
import type { FastifyRequest, FastifyReply } from 'fastify'
import camelcaseKeys from 'camelcase-keys'

import CreateUserState from './createUserState'
import UserRepository from '../../../repositories/userRepository'
import DB from '../../../repositories/db'
import { statusCodeFor } from '../../../errors'

const repo = new UserRepository(DB)

const createUser = async (request: FastifyRequest, response: FastifyReply) => {
  try {
    const body = camelcaseKeys(request.body as Record<string, unknown>)

    const result = await EitherAsync.liftEither(CreateUserState.create(body))
      .chain(async (state) => {
        const user = await repo.create(state.name, state.email)
        return Right(user)
      })
      .run()

    result.caseOf({
      Left: (err) => {
        request.log.warn(err)
        response.code(statusCodeFor(err)).send({ error: err.message })
      },
      Right: (user) => {
        response.code(201).send({ id: user.id, name: user.name, email: user.email })
      }
    })
  } catch (err) {
    request.log.error(err)
    response.code(500).send({ error: 'error creating user' })
  }
}

export default createUser
