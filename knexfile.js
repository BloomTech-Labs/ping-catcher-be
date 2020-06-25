// Update with your config settings.

module.exports = {
  development: {
    client: "pg",
    connection: {
      filename: "process.env.DATABASE_URL",
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
    ssl=true
  },
};
