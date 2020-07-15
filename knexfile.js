
module.exports = {
  development: {
    client: "pg",
    connection: {
      filename: "process.env.DATABASE_URL",
    },
  },

  testing: {
    client: "pg",
    connection: process.env.HEROKU_POSTGRESQL_AMBER_URL,
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: "./migrations",
    },
  },

  production: {
    client: "pg",
    connection: process.env.DATABASE_URL,
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: "./migrations",
    },
  },
};
