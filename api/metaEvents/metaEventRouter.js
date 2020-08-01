const express = require("express");
const MetaEvent = require("./metaEventsModel")

const router = express.Router();

router.post('/newSubscription', (req, res) => {
  const sub = req.body; // Check what values are needed from the req.body
  console.log(req.body);
  const stringObject = JSON.stringify(sub); 
  console.log("Destructured, stringified object", stringObject);

  MetaEvent.findByText(stringObject) // Check to see if the subscription already exists
    .then(subResponse => { 
      res.status(200).json({message: "subscription already exists"})
    })
    .catch(err => { // If subscription does not exist, add it
      MetaEvent.add(stringObject)
        .then(addSub => {
          res.status(301).json(addSub)
        })
        .catch(err => {
          res.status(500).json({message: "Cannot add to database", err})
        })
    })
})

module.exports = router;