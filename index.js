const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const app = express();
const PORT = process.env.PORT || 5000;

const eventRouter = require("./events/eventsRouter");

app.use("/event", eventRouter);
app.use(cors());
app.use(helmet());
app.listen(PORT, () => console.log(`Server is listening on ${PORT}`));
