import 'dotenv/config'

const dbConfiguration = {
  client: 'postgresql',
  useNullAsDefault: true,
  connection: process.env.DATABASE_URL,
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    directory: './db/migrations',
    tableName: 'knex_migrations',
  },
}

export default {
  development: dbConfiguration,
  test: dbConfiguration,
  production: dbConfiguration,
}
