const db = require("../database/db-config");
const slackUser = require('./slackUserModel');

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
  console.log(event);
  let slack_user_id;

  const user = slackUser.findByName(slack_username) 
  if (!user) {
    slack_user_id = slackUser.add(slack_username)
    } else {
      slack_user_id = user.id
  };
  // console.log(slack_username);
  // console.log(slack_user_id);
  const newEvent = { type, text, slack_user_id, team, channel, timestamp, event_timestamp};
  return db("events").insert(newEvent);
}
