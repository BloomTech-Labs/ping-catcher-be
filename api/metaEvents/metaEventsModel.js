const db = require('../../database/db-config');

module.exports = {
  findByText,
  add
}

function findByText(stringObject) {
  console.log("Inside of meta events find by text", stringObject)
  return db('meta_events').where(stringObject).first();
}

function add({event_key}) {
  const meta_event = JSON.parse(event_key)
  return db('meta_events').insert({...meta_event, event_key}).returning('id');
}