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
  Events.add(event)
    .then((respEvent) => {
      res.status(200).json(respEvent);
    })
    .catch((err) => {
      res.status(500).json({ message: "problem with database", err });
    });
});

router.post('/verifyUser', (req, res) => {
  const {preferred_username} = req.body;
  
  Users.findByName(preferred_username)
    .then(res => {
      if (res) {
        res.status(200).json(res)
      } else {
        Users.add(preferred_username)
        res.status(201).json(res)
      }
    })
    .catch(err => {
      res.status(500).json(err)
    })
})
module.exports = router;
