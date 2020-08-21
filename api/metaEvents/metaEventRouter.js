const express = require("express");
const MetaEvent = require("./metaEventsModel");
const Ranking = require("../rankings/rankingModel");
const ThreadRanking = require("../rankings/threadRankingModel");
const SlackUser = require("../slackUsers/slackUserModel");
const UsersModel = require("../users/usersModel");

const router = express.Router();

async function addMetaEvent({
  res,
  rankResponse,
  slackUser,
  event_key,
  nickname}) {
    let metaResponse
    let addMeta 
    let addThread
    let name = JSON.parse(event_key).nickname;
    try{
       metaResponse = await MetaEvent.findByText({ event_key })
       if(metaResponse){
        try{
          addThread = await threadRankingModel.add({
            event_id: metaResponse.id,
            nickname: name,
            rankings_id: rankResponse,
            slack_user: slackUser,
            last_accessed: ''
          })
          res.status(201)
        }
        catch(err){
          console.log(err)
        }
      } else {
        try{
          addMeta = await MetaEvent.add({ event_key })
          console.log("add meta event", addMeta)
          addThread = await ThreadRanking.add({
            event_id: addMeta[0],
            nickname: name,
            rankings_id: rankResponse,
            slack_user: slackUser,
            last_accessed: ''
        })
        res.status(201)
        }
        catch(err){
          console.log("parse error?", err)
        }
      }
    }
    catch(err){
      console.log(err)
    }
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
  const sub = {
    // Set variable to be be stringified
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

  async function findRanking() {
    let userResponse
    let rankResponse
    let ranking_id
    try{
      userResponse = await SlackUser.findByName({ slack_username: slackUser })
    }
    catch(err){
      console.log(err)
    }
    try{
      rankResponse = await Ranking.findById({ id: userResponse.ranking_id })
    }
    catch(err){
      console.log(err)
    }
    if(rankResponse === -1) {
      try{
        ranking_id = await Ranking.add({ user_id: userResponse.user_id })
        await SlackUser.update({ slack_username: slackUser, update: {ranking_id: ranking_id[0]} })
      }
      catch(err){
        console.log(err)
      }
    } else {
      ranking_id = rankResponse.id
    }
    addMetaEvent({ res, slackUser: slackUser.slack_username, rankResponse: ranking_id, event_key })
  }

  findRanking();

});

module.exports = router;
