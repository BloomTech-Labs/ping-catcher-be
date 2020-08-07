const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const bodyParser = require("body-parser");

const eventRouter = require("./api/events/eventsRouter");
const usersRouter = require("./api/users/usersRouter");
const rankingsRouter = require("./api/rankings/rankingRouter");
const slackUserRouter = require("./api/slackUsers/slackUserRouter");
const threadRankingRouter = require("./api/rankings/threadRankingRouter");
const metaEventRouter = require("./api/metaEvents/metaEventRouter");
const sseRouter = require('./api/sse/sseRouter');

const server = express();
server.use(cors());
server.use(express.json());
server.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
server.use(helmet());

server.use("/event", eventRouter);
server.use("/users", usersRouter);
server.use("/rankings", rankingsRouter);
server.use("/slackuser", slackUserRouter);
server.use("/selectEvent", threadRankingRouter);
server.use("/metaEvent", metaEventRouter);
server.use("/stream", sseRouter);

server.get("/", (req, res) => {
  res.send("<h2>Ping Catcher back end</h2>");
});

module.exports = server;
