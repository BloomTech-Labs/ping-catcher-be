const express = require("express");
const Events = require("./eventsModel.js");
const SlackUser = require('./slackUserModel.js');
const Users = require('./usersModel');

const challenge = require("./challenge-middleware");

const router = express.Router();

router.get("/", (req, res) => {
  Events.find()
    .then((event) => {
      res.status(200).json(event);
    })
    .catch((err) => {
      res.status(500).json({ message: "problem getting events", err });
    });
});

router.post("/", challenge, (req, res) => {
  let { event } = req.body;

  // SlackUser.findByName(event.user)
  // .then(userId => {
  //   if (!userId) {
  //   slack_user_id = SlackUser.add({slack_username: event.user})
  //   console.log("if", slack_user_id)
  //   } else {
  //     slack_user_id = userId
  //     console.log("else", userId)
  // };
  Events.add(event)
    .then((respEvent) => {
      res.status(200).json(respEvent);
    })
    .catch((err) => {
      res.status(500).json({ message: "problem with database", err });
    });
  });
// });

router.post('/verifyUser', (req, res) => {
  const {preferred_username, sub} = req.body;
  
  Users.findByName(preferred_username)
    .then(res => {
      if (res) {
        res.status(200).json(res)
      } else {
        Users.add(preferred_username, sub)
        res.status(201).json(res)
      }
    })
    .catch(err => {
      res.status(500).json(err)
    })
})
module.exports = router;
