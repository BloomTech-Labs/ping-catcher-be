const db = require('../database/db-config')

module.exports = {
  find,
  add
}

function find(user_id) {
  return db('rankings').where({user_id})
}

function add(user_id) {
  return db('rankings').insert({user_id})
}