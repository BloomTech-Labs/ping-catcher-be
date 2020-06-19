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

router.post("/", challenge, async, (req, res) => {
  let { event } = req.body;
  // console.log(req);
  let newEvent = await Events.add(event);
});

module.exports = router;
