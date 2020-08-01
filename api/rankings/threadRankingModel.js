const db = require('../../database/db-config');

module.exports = {
  find,
  add,
  findByText
}

function find(rankings_id) {
  return db('thread_ranking').where({rankings_id})
}

function add(nickname) {
  return db('rankings').insert({nickname})
}

function findByText(text) {
  console.log("Inside thread ranking model find by text", text)
  return db('events').where({ text })
}