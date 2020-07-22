const express = require("express");
const Users = require('./usersModel');

const router = express.Router();

router.get("/", (req, res) => {
  Users.find()
    .then((res) => {
      res.status(200).json(res);
    })
    .catch((err) => {
      res.status(500).json({ message: "problem getting users", err });
    });
});

module.exports = router;