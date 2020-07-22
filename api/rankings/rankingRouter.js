const express = require("express");
const Rankings = require("./rankingModel");

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

module.exports = router;