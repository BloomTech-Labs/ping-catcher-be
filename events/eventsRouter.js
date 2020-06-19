const express = require("express");
const Events = require("./eventsModel.js");

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
  // console.log(req);
  Events.add(event)
    .then((respEvent) => {
      res.status(200).json(respEvent);
    })
    .catch((err) => {
      res.status(500).json({ message: "problem with database", err });
    });
});

module.exports = router;
