const db = require("../database/db-config");

module.exports = {
  find,
  add,
};

function find() {
  return db("events");
}

function add(event) {
  const {
    text,
    type,
    event_ts: event_timestamp,
    user: slack_username,
    team,
    channel,
    ts: timestamp,
  } = event;
  const slack_user_id = Number(slack_username); //Do a find for user, return users id
  const newEvent = { type, text, slack_user_id, slack_username, team, channel};
  return db("events").insert(newEvent);
}
