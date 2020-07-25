const express = require("express");
const Users = require('./usersModel');

const router = express.Router();

router.get("/", (req, res) => {
  Users.find()
    .then(user => {
      res.status(200).json(user);
    })
    .catch((err) => {
      res.status(500).json({ message: "problem getting users", err });
    });
});

router.post('/newUser', (req, res) => {
  const {slack_user, username, password} = req.body;
  Users.add({slack_user, username, password})
    .then(user => {
      res.status(201).json({user})
    })
    .catch(err => {
      res.status(302).json({err})
    })
})
module.exports = router;