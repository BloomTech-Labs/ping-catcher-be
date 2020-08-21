const db = require('../../database/db-config');

module.exports = {
  find,
  add,
  findByText,
  findByRankId
}

function find(rankings_id) {
  return db('thread_ranking').where({rankings_id})
}

function add({event_id, nickname, rankings_id, slack_user, last_accessed}) {
  console.log("Event id", event_id)
  return db('thread_ranking').insert({event_id, nickname, rankings_id, slack_user, last_accessed})
}

function findByText(text) {
  console.log("Inside thread ranking model find by text", text)
  return db('events').where('text', 'like', `%${text}%`)
}

function findByRankId({rankings_id}) {
  return db('thread_ranking').where({rankings_id});
}
