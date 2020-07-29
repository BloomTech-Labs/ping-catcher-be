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
    api_app_id,
    team_id,
    token,
    text,
    type,
    event_ts: event_timestamp,
    // slack_user_id,
    // user: slack_username,
    team,
    channel,
    ts: timestamp,
  } = event;
  console.log(event);
  // console.log(event);
  // let slack_user_id;

  // const userId = slackUser.findByName(event.user) 
  // if (!userId) {
  //   slack_user_id = slackUser.add({slack_username: event.user})
  //   console.log("if", slack_user_id)
  //   } else {
  //     slack_user_id = userId
  //     console.log("else", userId)
  // };
  // console.log(slack_username);
  // console.log(slack_user_id);
  const newEvent = { type, text, slack_user, team, channel, timestamp, event_timestamp};
  return db("events").insert(newEvent).returning('slack_user_id')
}
