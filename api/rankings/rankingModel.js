const db = require('../../database/db-config');

module.exports = {
  find,
  add,
  findById
}

function find() {
  return db("rankings");
}

function findById({id}) {
  return db('rankings').where({id});
}

function add(user_id) {
  return db('rankings').insert({user_id}).returning('id');
}