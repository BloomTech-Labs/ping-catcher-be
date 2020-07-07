const db = require('../database/db-config');

module.exports = {
  find,
  add,
  findBy
}

function find(rankings_id) {
  return db('thread_ranking').where({rankings_id})
}

function add(nickname) {
  return db('rankings').insert({nickname})
}