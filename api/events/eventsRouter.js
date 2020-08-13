const express = require("express");
const Events = require("./eventsModel.js");
const SlackUser = require('../slackUsers/slackUserModel');
const Users = require('../users/usersModel');

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
  });
  
  function addEvent({event, res}) {
    Events.add(event) //Add event to database
      .then((respEvent) => {
        res.status(200).json(respEvent);
      })
      .catch((err) => {
        res.status(500).json({ message: "problem with database", err });
      });
  }

  function addSlackUser({newUser, res}) {
    SlackUser.add(newUser)
      .then(respNewUser => {
        res.status(200).json(respNewUser)
      })
      .catch(err => {
        res.status(500).json({ message: "problem with the database", err})
      })
  }

  router.post("/", challenge, (req, res) => {
    let { api_app_id, event } = req.body;
    console.log(req.body);
    SlackUser.findByName({ slack_username: event.user }) // search database for an existing slack user
      .then((result) => {
        console.log(result);
        result.slack_username === event.user;
        addEvent({ event: { ...event, slack_user: event.user }, res }); // if slack user is found in database, run this code to add the event
      })
      .catch((err) => { // If slackUser returns undefined, it will go to this catch method
        Users.findByName({ slack_user: api_app_id }) // search for an existing user in the database that matches the api_app_id
          .then((userResult) => {
            console.log("Inside of users find by name", userResult);
            SlackUser.add({slack_username: event.user, user_id: userResult.id, ranking_id: null}) 
              .then((slackUserResponse) => {
                console.log(slackUserResponse);
                addEvent({ event: { ...event, slack_user: event.user }, res });
              })
              .catch((err) => {
                console.log('error adding slack user', err)
              });
          })
          .catch((err) => {
            // If user does not exist in the database it will return undefined and go to this catch statement
            // Add a new user with the values pulled from the req.body
            Users.add({
              slack_user: req.body.api_app_id,
              username: req.body.team_id,
              password: req.body.token,
            }) // If user is not found in the database, this code will add the user to the users table in the database
              .then((user_id) => {
                console.log("after user if", user_id);
                SlackUser.add({ slack_username: event.user, user_id, ranking_id: null }) // this code will then add a new slack user to the database pointing to the new user
                  .then((slackUserResponse) => {
                    console.log("slack user response", slackUserResponse);
                    console.log("right before event", event.user);
                    addEvent({
                      event: { ...event, slack_user: event.user },
                      res,
                    }); // this will then add the event to the events table pointing to the new slack user
                  })
                  .catch((err) => {
                    res.status(500).json({
                      message: "Could not add slack user to the database",
                      err,
                    });
                  });
              })
              .catch((err) => {
                res.status(500).json({
                  message: "Could not add user to database",
                  err,
                });
              });
          });
      })
  });

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
