import { Just, Nothing } from 'purify-ts'
import type { Knex } from 'knex'
import User from '../models/user'

interface UserRow {
  id: string
  name: string
  email: string
}

class UserRepository {
  public static readonly TABLE = 'users'
  private readonly db: Knex

  constructor(db: Knex) {
    this.db = db
  }

  public async create(name: string, email: string) {
    const rows = (await this.db(UserRepository.TABLE)
      .returning(['id', 'name', 'email'])
      .insert({ name, email })) as UserRow[]

    return User.create(rows[0]!.id, rows[0]!.name, rows[0]!.email)
  }

  public async findById(id: string) {
    const row = (await this.db(UserRepository.TABLE)
      .where({ id })
      .select(['id', 'name', 'email'])
      .first()) as UserRow | undefined

    return row ? Just(User.create(row.id, row.name, row.email)) : Nothing
  }

  public async findAll() {
    const rows = (await this.db(UserRepository.TABLE)
      .select(['id', 'name', 'email'])
      .orderBy('created_at', 'desc')) as UserRow[]

    return rows.map((r) => User.create(r.id, r.name, r.email))
  }
}

export default UserRepository
