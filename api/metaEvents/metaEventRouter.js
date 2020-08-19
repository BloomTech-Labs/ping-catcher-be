const express = require("express");
const MetaEvent = require("./metaEventsModel")
const Ranking = require('../rankings/rankingModel');
const ThreadRanking = require('../rankings/threadRankingModel');
const SlackUser = require('../slackUsers/slackUserModel');
const UsersModel = require("../users/usersModel");

const router = express.Router();

const addMetaEvent = ({res, rankResponse, slackUser, event_key, nickname}) => {
  console.log(rankResponse);
  MetaEvent.findByText({event_key}) // If ranking exists, search for an existing meta event with same parameters
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
      MetaEvent.add({event_key})
        .then(addSub => {
          console.log("adding meta event", addSub);
          ThreadRanking.add({
            event_id: addSub,
            nickname,
            rankings_id: rankResponse,
            slack_user: slackUser,
          })
        })
        .catch(err => {
          console.log("Could not add meta event", err)
        })
    });
}

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

  const event_key = JSON.stringify(sub);
  console.log("Stringified object", event_key);

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
        if(rankResponse === -1){
          Ranking.add({user_id: userResponse.user_id})
          .then(rankingId => {
            SlackUser.update({ranking_id: rankingId})
            addMetaEvent({res, rankResponse, slackUser, event_key})
          })
        } else {
          addMetaEvent({res, rankResponse, slackUser, event_key});
        }
      })
      .catch((err) => {
        UsersModel.find
        Ranking.add({user_id: userResponse.ranking_id}) // Add a new ranking for the user
          .then((rankingId) => {
                addMetaEvent({res, rankResponse, slackUser, event_key})
          })
          .catch((err) => {
            res.status(404).json({ message: "Slack user not found" });
          });
      });
  });
});

module.exports = router;