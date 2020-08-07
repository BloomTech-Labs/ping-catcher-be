const db = require('../../database/db-config');

module.exports = {
  findById
}

function findById({id}){
  return db('meta_events').where({id})
}