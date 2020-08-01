const db = require('../../database/db-config');

module.exports = {
  findByText
}

function findByText(stringObject) {
  console.log("Inside of meta events find by text", stringObject)
  return db('meta_events').where(stringObject).returning('id')
}