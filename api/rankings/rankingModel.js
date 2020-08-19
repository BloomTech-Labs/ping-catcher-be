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
  const ranking = db('rankings').where({id});
  if(ranking){
    return ranking
  } 
  return -1;
}

function add(user_id) {
  return db('rankings').insert({user_id}).returning('id');
}