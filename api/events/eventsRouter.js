const express = require("express");
const Events = require("./eventsModel.js");
const SlackUser = require('../slackUsers/slackUserModel.js');
const Users = require('../users/usersModel');
const request = require('request');

const challenge = require("../middleware/challenge-middleware");


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

  function addEvent(event) {
    Events.add(event) //Add event to database
      .then((respEvent) => {
        res.status(200).json(respEvent);
      })
      .catch((err) => {
        res.status(500).json({ message: "problem with database", err });
      });
  }

  router.get('/id/:slack_user', (req, res) => {
    const {slack_user} = req.params;
    console.log(req.params)
    SlackUser.find({slack_user})
     .then(res => {
       res.send(id)
       console.log(res)
     })
     .catch(err => {
       res.json({message: "couldn't find id", err})
     })
  })

router.post("/", challenge, (req, res) => {
  let { event } = req.body;
  console.log("eventRouter");
  // Search database for existing user
  request('http://localhost:5000/slackuser/id/Kyle', (err, response, body) => {
        console.log("body", body)
        console.log("res", response)
        console.log("err", err)
  })

  // SlackUser.findById({ id: event.user })
  //   .then((id) => {
  //     console.log("id exists!", id)
  //       ? addEvent({ ...event, slack_user_id: existsId }) // If user is found
  //       : Users.add({
  //           slack_user: event.api_app_id,
  //           username: event.team_id,
  //           password: event.token,
  //         })
  //           .then((user_id) => {
  //             SlackUser.add({ slack_user, user_id })
  //               .then((slack_user_id) => {
  //                 // If no user is found add user into database
  //                 console.log("if there is no user", slack_user);
  //                 addEvent({ ...event, slack_user_id });
  //               })
  //               .catch((err) => {
  //                 res
  //                   .status(500)
  //                   .json({
  //                     message: "Could not add slack user to database",
  //                     err,
  //                   });
  //               });
  //           })
  //           .catch((err) => {
  //             res
  //               .status(500)
  //               .json({ message: "could not add new user to database", err });
  //           });
  //   })
  //   .catch((err) => {
  //     res.status(500).json({ message: "Could not find id", err });
  //   });
});

    // SlackUser.findByName(event.user)
    // .then(userId => {
    //   if (!userId) {
    //   slack_user_id = SlackUser.add({slack_username: event.user})
    //   console.log("if", slack_user_id)
    //   } else {
    //     slack_user_id = userId
    //     console.log("else", userId)
    // };

// });

router.post('/verifyUser', (req, res) => {
  const {preferred_username, sub} = req.body;
  
  Users.findByName(preferred_username)
    .then(res => {
      if (res) {
        res.status(200).json(res)
      } else {
        Users.add(preferred_username, sub)
        res.status(201).json(res)
      }
    })
    .catch(err => {
      res.status(500).json(err)
    })
})
module.exports = router;
