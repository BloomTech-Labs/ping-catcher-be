const express = require("express");
const MetaEvent = require("./metaEventsModel")
const Ranking = require('../rankings/rankingModel');
const ThreadRanking = require('../rankings/threadRankingModel');
const SlackUser = require('../slackUsers/slackUserModel');
const UsersModel = require("../users/usersModel");

const router = express.Router();

router.post("/newSubscription", (req, res) => {
  const {
    slackUser,
    nickname,
    text_inlcudes,
    event_type,
    from_user,
    from_channel,
    from_team,
    start_time,
    end_time,
  } = req.body;
  console.log(req.body);
  const sub = { // Set variable to be be stringified
    nickname,
    text_inlcudes,
    event_type,
    from_user,
    from_channel,
    from_team,
    start_time,
    end_time,
  };

  const stringObject = JSON.stringify(sub);
  console.log("Stringified object", stringObject);

  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers":
      "Origin, X-Requested-With, Content-Type, Accept",
  };
  res.set(headers);

  SlackUser.findByName({ slack_username: slackUser }).then((userResponse) => { // Search for existing slack user, if not found code doesn't run
  console.log(userResponse)
    Ranking.findById({ id: userResponse.ranking_id }) // Looks for an existing ranking, if not found, will jump to catch statement to add a ranking for the slack user
      .then((rankResponse) => {
        console.log(rankResponse);
        MetaEvent.findByText(stringObject) // If ranking exists, search for an existing meta event with same parameters
          .then((subResponse) => {
            console.log("meta event find by text", subResponse);
            ThreadRanking.add({ // If meta event already exists, add a thread ranking pointing to it for the current user
              event_id: subResponse.id,
              nickname,
              rankings_id: rankResponse,
              slack_user: slackUser,
            });
            res.status(200).json(subResponse);
          })
          .catch(err => {
            MetaEvent.add(stringObject)
              .then(addSub => {
                console.log("adding meta event", addSub);
              })
                .then(
                  ThreadRanking.add({
                    event_id: subResponse.id,
                    nickname,
                    rankings_id: rankResponse,
                    slack_user: slackUser,
                  })
                )
                .catch(err => {
                  console.log("Could not add thread ranking", err)
                })
              .catch(err => {
                console.log("Could not add meta event", err)
              })
          });
      })
      .catch((err) => {
        UsersModel.find
        Ranking.add({user_id: userResponse.ranking_id}) // Add a new ranking for the user
          .then((rankingId) => {
            console.log("ranking add", rankingId);
            MetaEvent.findByText(stringObject) // Check to see if the subscription already exists
              .then((event_id) => {
                console.log("meta event find by text", event_id);
                ThreadRanking.add({
                  event_id,
                  nickname,
                  rankings_id: rankingId,
                  slack_user: slackUser,
                });
                res.status(301).json(event_id);
              })
              .catch((err) => {
                // If subscription does not exist, add it
                MetaEvent.add(stringObject)
                  .then((addSub) => {
                    console.log("meta event add", addSub);
                    res.status(301).json(addSub);
                  })
                  .then(
                    ThreadRanking.add({ // Add the thread ranking
                      event_id: addSub,
                      nickname,
                      rankings_id: rankingId,
                      slack_user: slackUser
                    })
                  )
                  .catch((err) => {
                    res
                      .status(500)
                      .json({ message: "Could not add thread ranking", err });
                  })
                  .catch((err) => {
                    res
                      .status(200)
                      .json({ message: "Cannot add to database", err });
                  });
              });
          })
          .catch((err) => {
            res.status(404).json({ message: "Slack user not found" });
          });
      });
  });
});

module.exports = router;