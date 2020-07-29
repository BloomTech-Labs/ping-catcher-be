const express = require("express");
const SlackUser = require("./slackUserModel");

const router = express.Router();

router.get("/", (req, res) => {
  SlackUser.find()
    .then(slackUser => {
      res.status(200).json(slackUser);
    })
    .catch((err) => {
      res.status(500).json({ message: "problem getting slack users", err });
    });
});

router.get('/id/:slack_username', (req, res) => {
  const {slack_username} = req.params;

  SlackUser.findByName({slack_username})
    .then(slack_username => {
      if(slack_username) {
        res.status(200).json({slack_username})
      } else {
        res.status(404).json({message: "Slack username not found"})
      }
    })
    .catch(err => {
      res.status(500).json({message: "Error accessing the database", err})
    })
})

router.post('/newSlackUser', (req, res) => {
  const {slack_username, user_id} = req.body;

  SlackUser.add({slack_username, user_id})
    .then(slack_username => {
      res.status(301).json({slack_username})
    })
})

module.exports = router;