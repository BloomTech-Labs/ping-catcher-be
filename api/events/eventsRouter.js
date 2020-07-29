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
    const {slack_username} = req.params;
    console.log(req.params)
    SlackUser.findByName({slack_username})
     .then(res => {
       res.send(slack_username)
       console.log(res)
     })
     .catch(err => {
       res.json({message: "couldn't find user", err})
     })
  })

  router.post("/", challenge, (req, res) => {
    let { event } = req.body;
    SlackUser.findByName({ slack_username: event.user }).then((user) => {
      console.log(slack_username);
      console.log("user exists!", user)
        ? addEvent({ ...event, slack_username }) // if user is found in database, run this code to add the event
        : Users.add({
            slack_user: event.api_app_id,
            username: event.team_id,
            password: event.token,
          })  // If user is not found in the database, this code will add the user to the users table in the database
            .then(user_id => {
              SlackUser.add({ slack_username, user_id }) // this code will then add the user to the slack user table 
                .then(slack_username => { 
                  addEvent({ ...event, slack_username }) // this will then add the event to the events table
                }) 
                .catch(err => {
                  res.status(500).json({message: "Could not add slack user to the database"})
                })
            }) 
            .catch(err => {
              res.status(500).json({message: "Could not add user to database"})
            })
    })
    .catch(err => {
      res.status(500).json({message: "Could not find user by id"})
    })
  });

// router.post("/", challenge, (req, res) => {
//   let { event } = req.body;
//   console.log("eventRouter");
//   // Search database for existing user
//   request('/slackuser/id/Kyle', (err, response, body) => {
//         console.log("body", body)
//         console.log("res", response)
//         console.log("err", err)
//   })

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
// });

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
