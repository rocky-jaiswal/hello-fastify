import Knex from 'knex'
import Pg from 'pg'

Pg.types.setTypeParser(20, 'text', parseInt)
Pg.types.setTypeParser(1700, 'text', parseFloat)

const DB = Knex({
  client: 'postgresql',
  connection: process.env.DATABASE_URL,
  pool: { min: 2, max: 10 },
})

export default DB
