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
    // slack_user_id,
    slack_username: slack_user,
    team,
    channel,
    ts: timestamp,
  } = event;
  console.log("add event", event);
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
  return db("events").insert(newEvent).returning('id'); //change to async function?
}
