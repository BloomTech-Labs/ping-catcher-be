const express = require("express");
const MetaEvent = require("./metaEventsModel")
const Ranking = require('../rankings/rankingModel');
const ThreadRanking = require('../rankings/threadRankingModel');

const router = express.Router();

router.post("/newSubscription", (req, res) => {
  const { slackUser, nickname } = req.body;
  const headers = {"Access-Control-Allow-Origin": "https://www.ping-catcher.com/",
  "Access-Control-Allow-Headers":
    "Origin, X-Requested-With, Content-Type, Accept"}
    res.set(headers);
  return res.status(200).json({message: 'working'});
  console.log(req.body);
  // const stringObject = JSON.stringify(sub);
  // console.log("Destructured, stringified object", stringObject);

  Ranking.findById(id).then((rankResponse) => {
    console.log("ranking find by id", rankResponse);
    rankResponse;
    MetaEvent.findByText(stringObject) // Check to see if the subscription already exists
      .then((subResponse) => {
        console.log("meta event find by id", subResponse);
        ThreadRanking.add({
          event_id: subResponse,
          nickname,
          rankings_id: rankResponse,
        });
        res.status(200).json(subResponse);
      })
      .catch((err) => {
        // If subscription does not exist, add it
        MetaEvent.add(stringObject)
          .then((addSub) => {
            console.log("meta event add", addSub)
            res.status(301).json(addSub);
          })
          .then(
            ThreadRanking.add({
              event_id: addSub,
              nickname,
              rankings_id: rankingId,
            })
          )
          .catch((err) => {
            res
              .status(500)
              .json({ message: "Could not add thread ranking", err });
          })
          .catch((err) => {
            res.status(200).json({ message: "Cannot add to database", err });
          });
      })
      .catch((err) => {
        Ranking.add(id).then((rankingId) => {
          console.log("ranking add", rankingId);
          MetaEvent.findByText(stringObject) // Check to see if the subscription already exists
            .then((event_id) => {
              console.log("meta event find by text", event_id);
              ThreadRanking.add({
                event_id,
                nickname,
                rankings_id: rankingId,
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
                  ThreadRanking.add({
                    event_id: addSub,
                    nickname,
                    rankings_id: rankingId,
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
        });
      });
  });
});





  

module.exports = router;