const db = require('../../database/db-config');

module.exports = {
  find,
  add
}

function find() {
  return db("rankings");
}

function add(user_id) {
  return db('rankings').insert({user_id})
}