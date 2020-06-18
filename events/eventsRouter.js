const express = require("express");
const Events = require("./eventsModel.js");

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

router.post("/", (req, res) => {
  const event = req.body;

  Events.add(event)
    .then((event) => {
      if (event.challenge) {
        res.status(200);
        res.contentType("text/plain");
        res.send(event.challenge);
      } else {
        Events.add(event);
      }
    })
    .catch((err) => {
      res.status(500).json({ message: "problem with database", err });
    });
});

module.exports = router;
