const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const bodyParser = require("body-parser");

const eventRouter = require("./events/eventsRouter");

const server = express();

server.use(express.json());
server.use(helmet());
server.use(cors());
server.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

server.use("/event", eventRouter);

server.get("/", (req, res) => {
  res.send("<h2>Back end is working</h2>");
});

module.exports = server;
