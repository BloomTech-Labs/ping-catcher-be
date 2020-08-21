const express = require("express");
const Rankings = require("./rankingModel");
const SlackUser = require('../slackUsers/slackUserModel');
const ThreadRank = require('./threadRankingModel');
const MetaEvent = require('../metaEvents/metaEventsModel');

const router = express.Router();

router.get("/", (req, res) => {
  Rankings.find()
    .then((res) => {
      res.status(200).json(res);
    })
    .catch((err) => {
      res.status(500).json({ message: "problem getting rankings", err });
    });
});

router.get('/subscriptions/user/:slack_username', (req, res) => {
  const slack_username = req.params.slack_username;
  async function getUser() {
  let slackResponse
  let rankResponse

  try{
    slackResponse = await SlackUser.findByName({slack_username})
    rankResponse = await Rankings.findById({id: slackResponse.ranking_id})
    threadRank = await ThreadRank.findByRankId({rankings_id: rankResponse.id})
    res.status(200).json(threadRank)
  }
  catch(err){
    console.log(err)
  }
}
getUser()
})

router.get('/subscriptions/id/:id', (req, res) => {
  const { id } = req.params;

  async function getSubs() {
  let metaEvent
  try{
  metaEvent = await MetaEvent.findById({id})
  res.status(200).json(metaEvent)
  }
  catch(err){
    console.log(err)
  }
}
getSubs()
})

module.exports = router;