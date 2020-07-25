const express = require("express");
const SlackUser = require("./slackUserModel");

const router = express.Router();

router.get("/", (req, res) => {
  SlackUser.find()
    .then((res) => {
      res.status(200).json(res);
    })
    .catch((err) => {
      res.status(500).json({ message: "problem getting slack users", err });
    });
});

router.get('/id/:slack_user', (req, res) => {
  const {slack_user} = req.params;

  SlackUser.findByName({slack_user})
    .then(slackUser => {
      res.status(200).json({slackUser})
    })
    .catch(err => {
      res.status(500).json({message: "Could not find user", slack_user, err})
    })
})

router.post('/newSlackUser', (req, res) => {
  SlackUser.add()
})

module.exports = router;