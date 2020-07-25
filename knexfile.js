
// module.exports = {

//   testing: {
//     client: "pg",
//     connection: process.env.HEROKU_POSTGRESQL_JADE_URL,
//     pool: {
//       min: 0,
//       max: 10,
//     },
//     acquireConnectionTimeout: 10000,
//     migrations: {
//       directory: "./migrations",
//     },
//   },

//   production: {
//     client: "pg",
//     connection: process.env.DATABASE_URL,
//     pool: {
//       min: 2,
//       max: 10,
//     },
//     migrations: {
//       directory: "./migrations",
//     },
//   },
// };

module.exports = {
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
