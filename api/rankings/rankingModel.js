const db = require('../../database/db-config');

module.exports = {
  find,
  add,
  findById
}

function find() {
  return db("rankings");
}

async function findById({id}) {
  const ranking = await db('rankings').where({id}).first();
  console.log("ranking in find by id", ranking)
  if(ranking === undefined){
    return -1
  } 
  return ranking;
}

function add({user_id}) {
  return db('rankings').insert({user_id}).returning('id');
}