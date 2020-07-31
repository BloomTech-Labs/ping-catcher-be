const express = require("express");
const ThreadRank = require("./threadRankingModel");

const router = express.Router();

router.get('/:text', (req, res) => {
  const {text} = req.params;
  ThreadRank.findByText(text)
    .then(event => {
      console.log("after find by text", text)
      event
      ? res.status(200).json(event)
      : res.status(404).json({message: "events not found"})
    })
    .catch(err => {
      res.status(500).json({message: "Problem getting events", err})
    })
})

module.exports = router;
