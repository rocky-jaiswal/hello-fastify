import { EitherAsync } from 'purify-ts'
import type { FastifyRequest, FastifyReply } from 'fastify'

import UserRepository from '../../../repositories/userRepository'
import DB from '../../../repositories/db'
import { NotFoundError, statusCodeFor } from '../../../errors'
import User from '../../../models/user'

const repo = new UserRepository(DB)

export const getUserById = async (request: FastifyRequest, response: FastifyReply) => {
  try {
    const { id } = request.params as { id: string }

    const result = await EitherAsync<Error, User>(async ({ liftEither }) => {
      const maybeUser = await repo.findById(id)
      return liftEither(maybeUser.toEither(new NotFoundError(`user ${id} not found`)))
    }).run()

    result.caseOf({
      Left: (err) => {
        request.log.warn(err)
        response.code(statusCodeFor(err)).send({ error: err.message })
      },
      Right: (user) => {
        response.code(200).send({ id: user.id, name: user.name, email: user.email })
      }
    })
  } catch (err) {
    request.log.error(err)
    response.code(500).send({ error: 'error fetching user' })
  }
}

export const getAllUsers = async (request: FastifyRequest, response: FastifyReply) => {
  try {
    const result = await EitherAsync<Error, User[]>(async () => repo.findAll()).run()

    result.caseOf({
      Left: (err) => response.code(500).send({ error: err.message }),
      Right: (users) => response.code(200).send(users.map((u) => ({ id: u.id, name: u.name, email: u.email })))
    })
  } catch (err) {
    request.log.error(err)
    response.code(500).send({ error: 'error fetching users' })
  }
}
