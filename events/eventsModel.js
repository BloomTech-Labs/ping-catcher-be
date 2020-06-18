const db = require("../database/db-config");

module.exports = {
  find,
  add,
};

function find() {
  return db("events");
}

async function add(event) {
  const {
    text,
    type,
    event_ts: event_timestamp,
    user: slack_user,
    team,
    channel,
    ts: timestamp,
  } = event;
  const newEvent = { text, type, slack_user, team, channel };
  await db("events").insert(newEvent);
}
