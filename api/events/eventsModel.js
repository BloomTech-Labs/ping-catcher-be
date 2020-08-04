const db = require("../../database/db-config");

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
    slack_username: slack_user,
    team,
    channel,
    ts: timestamp,
  } = event;
  console.log("add event", event);

  const newEvent = { type, text, slack_user, team, channel, timestamp, event_timestamp};
  return db("events").insert(newEvent).returning('id');
}
