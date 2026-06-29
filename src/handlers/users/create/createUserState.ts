import { Either, Left, Right } from 'purify-ts'
import { BadRequestError } from '../../../errors'

interface CreateUserInput {
  name?: unknown
  email?: unknown
}

class CreateUserState {
  public readonly name: string
  public readonly email: string

  constructor(name: string, email: string) {
    this.name = name
    this.email = email
  }

  public static create(body: CreateUserInput): Either<Error, CreateUserState> {
    if (!body.name || typeof body.name !== 'string') {
      return Left(new BadRequestError('name is required'))
    }
    if (!body.email || typeof body.email !== 'string') {
      return Left(new BadRequestError('email is required'))
    }
    return Right(new CreateUserState(body.name, body.email))
  }
}

export default CreateUserState
