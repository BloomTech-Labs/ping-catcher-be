const express = require("express");
const MetaEvent = require("./metaEventsModel");
const Ranking = require("../rankings/rankingModel");
const ThreadRanking = require("../rankings/threadRankingModel");
const SlackUser = require("../slackUsers/slackUserModel");
const UsersModel = require("../users/usersModel");

const router = express.Router();

// const addMetaEvent = ({
//   res,
//   rankResponse,
//   slackUser,
//   event_key,
//   nickname,
// }) => {
//   console.log(rankResponse);
//   MetaEvent.findByText({ event_key }) // If ranking exists, search for an existing meta event with same parameters
//     .then((subResponse) => {
//       console.log("meta event find by text", subResponse);
//       ThreadRanking.add({
//         // If meta event already exists, add a thread ranking pointing to it for the current user
//         event_id: subResponse.id,
//         nickname,
//         rankings_id: rankResponse,
//         slack_user: slackUser,
//         last_accessed: null
//       });
//       res.status(200).json(subResponse);
//     })
//     .catch((err) => {
//       MetaEvent.add({ event_key })
//         .then((addSub) => {
//           console.log("adding meta event", addSub);
//           ThreadRanking.add({
//             event_id: addSub,
//             nickname,
//             rankings_id: rankResponse,
//             slack_user: slackUser,
//             last_accessed: null
//           });
//         })
//         .catch((err) => {
//           console.log("Could not add meta event", err);
//         });
//     });
// };

async function addMetaEvent({
  res,
  rankResponse,
  slackUser,
  event_key,
  nickname}) {
    let metaResponse
    let addMeta 
    let addThread
    try{
       metaResponse = await MetaEvent.findByText({ event_key })
    }
    catch(err){
      console.log(err)
    }
      if(metaResponse){
        try{
          addThread = await threadRankingModel.add({
            event_id: metaResponse.id,
            nickname,
            rankings_id: rankResponse,
            slack_user: slackUser,
            last_accessed: null
          })
          res.status(201)
        }
        catch(err){
          console.log(err)
        }
      } else {
        try{
          addMeta = await MetaEvent.add({ event_key })
          addThread = await ThreadRanking.add({
            event_id: addMeta,
            nickname,
            rankings_id: rankResponse,
            slack_user: slackUser,
            last_accessed: null
        })
        res.status(201)
        }
        catch(err){
          console.log(err)
        }
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
      }
      catch(err){
        console.log(err)
      }
      try{
        await SlackUser.update({ slack_username: slackUser, update: {ranking_id: ranking_id[0]} })
      }
      catch(err){
        console.log(err)
      }
    }
    addMetaEvent({ res, slackUser: slackUser.slack_username, rankResponse: ranking_id, event_key })
  }

  findRanking();

//   SlackUser.findByName({ slack_username: slackUser })
//     .then((userResponse) => {
//       // Search for existing slack user, if not found code doesn't run
//       console.log(userResponse); // Looks for an existing ranking, if not found, will jump to catch statement to add a ranking for the slack user
//       const rankResponse = Ranking.findById({id: userResponse.ranking_id})
//       return [rankResponse, userResponse]
//       // return [ Ranking.findById({ id: userResponse.ranking_id }), userResponse ];
//     })
//     .then((rankResponseArr) => {
//       const [rankResponse, userResponse] = rankResponseArr;
//       console.log("rank response", rankResponse)
//       if (rankResponse === -1) {
//         const ranking_id = Ranking.add({ user_id: userResponse.user_id }); // Start here.
//         SlackUser.update({ id: slackUser.id, update: {ranking_id} });
//         addMetaEvent({ res, slackUser: slackUser.slack_username, rankResponse: ranking_id, event_key });
//       } else {
//         addMetaEvent({ res, rankResponse, slackUser: slackUser.slack_username, event_key });
//       }
//     });
});

module.exports = router;
