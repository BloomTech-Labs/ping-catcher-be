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

router.get('/subscriptions/:slack_username', (req, res) => {
  const slack_username = req.params.slack_username;
  
  let slackResponse
  let rankResponse
  try{
    slackResponse = await SlackUser.findByName({slack_username})
    rankResponse = await Rankings.findById({ranking_id: slackResponse.ranking_id})
    threadRank = await ThreadRank.findByRankId({ranking_id: rankResponse[0]})
    res.status(200).json(threadRank)
  }
  catch(err){
    console.log(err)
  }
})

router.get('/subscriptions/:id', (req, res) => {
  const { id } = req.params;

  let metaEvent
  try{
  metaEvent = await MetaEvent.findById({id})
  res.status(200).json(metaEvent)
  }
  catch(err){
    console.log(err)
  }
})

module.exports = router;