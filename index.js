const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

const eventRouter = require("./events/eventsRouter");

app.use(express.json());
app.use("/event", eventRouter);
app.use(cors());
app.use(helmet());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.get('/', (req, res) => {
    res.send('<h2>Back end is working</h2>');
});

app.listen(PORT, () => console.log(`Server is listening on ${PORT}`));
