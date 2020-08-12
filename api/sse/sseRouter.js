const express = require('express');
const Ranking = require('../rankings/rankingModel');
const MetaEvent = require('../metaEvents/metaEventsModel');

const router = express.Router();

sseHeaders = {
  "Content-Type": "text/event-stream",
  "Cache-Control": "no-cache",
  Connection: "keep-alive",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "Origin, X-Requested-With, Content-Type, Accept"
};

function getMessages() {
  // return message(s) from message queue.
  return `The server time is now ${new Date()}`; // sending the server date as a test.
}

router.get("/", (req, res) => {
  const seconds = 1000;
  const n = 1;
  res.set(sseHeaders);
  setInterval(() => {
    res.write(`data: ${JSON.stringify(getMessages())}\n\n`);
  }, n * seconds); // send every n seconds until user client connection.
});

module.exports = router;