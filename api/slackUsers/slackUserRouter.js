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

module.exports = router;