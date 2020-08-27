# API Documentation

#### Code Climate
Project under review and scored by [Code Climate](https://codeclimate.com/github/Lambda-School-Labs/ping-catcher-be)

<a href="https://codeclimate.com/github/Lambda-School-Labs/ping-catcher-be/maintainability"><img src="https://api.codeclimate.com/v1/badges/07e5684b9844216b3c4e/maintainability" /></a>
<a href="https://codeclimate.com/github/Lambda-School-Labs/ping-catcher-be/test_coverage"><img src="https://api.codeclimate.com/v1/badges/07e5684b9844216b3c4e/test_coverage" /></a>

Backend delpoyed at [Heroku](https://ping-catcher-be.herokuapp.com/) <br>

## Getting started

To get the server running locally:

- Clone this repo
- **npm install** to install all required dependencies
- **npm start** to start the local server
- **npm test** to start server using testing environment

### Node.JS

-    We went with Node for it speed and scalability. It also also easy to switch between working on the front-end and the back-end due both running with Javascript


## Endpoints

| Method | Endpoint                | Access Control | Description                                  |
| ------ | ----------------------- | -------------- | -------------------------------------------- |
| GET    | `/event`                | authed users   | Returns all events in the events table       |
| GET    | `/id/:slack_user`       | authed users   | Return info for the specific user            |
| POST   | `/event`                | authed users   | Add a new event to the database              |
| GET | `/subscriptions/user/:slack_username`| authed users | Return id of the user who submitted new sub |
| GET | `/subscriptions/id/:id`              | authed users | Return id of the user who submitted new sub |
| GET    | `/selectEvent/:text`     | authed users |  Return all events that match text passed in |
| POST   | `/meta/newSubscription`  | authed users | Adds a new subscription for the user         |
| POST   | `/slackuser/newSlackUser`| authed users | Adds a new slack user to database            |
| POST   | `/users/newUser`         | user         | Adds a new user to database                  |


# Data Model

#### Users

---

```
{
  id: UUID
  name: STRING
  slack_user: STRING
  username: STRING
  password: STRING
  }
```

#### SLACK USERS

---

```
{
  id: UUID
  slack_username: STRING
  user_id: INTEGER
}
```

### EVENTS

---

```
{
  id: UUID
  type: STRING
  text: STRING
  slack_user: STRING
  team: STRING
  channel: STRING
  timestamp: STRING
  event_timestamp: STRING
}
```

### META EVENTS

---

```
{
  id: UUID
  text_includes: STRING
  event_type: STRING
  from_user: STRING
  from_team: STRING
  from_channel: STRING
  end_time: STRING
  stringObject: STRING
}
```

### RANKINGS

---

```
{
  id: UUID
  user_id: integer
}
```

### THREAD RANKINGS

---

```
{
  id: UUID
  rankings_id: integer
  slack_user: STRING
  event_id: integer
  last_accessed: STRING
  nickname: STRING
}
```

## Contributing

When contributing to this repository, please first discuss the change you wish to make via issue, email, or any other method with the owners of this repository before making a change.

Please note we have a [code of conduct](./code_of_conduct.md). Please follow it in all your interactions with the project.

### Issue/Bug Request

 **If you are having an issue with the existing project code, please submit a bug report under the following guidelines:**
 - Check first to see if your issue has already been reported.
 - Check to see if the issue has recently been fixed by attempting to reproduce the issue using the latest master branch in the repository.
 - Create a live example of the problem.
 - Submit a detailed bug report including your environment & browser, steps to reproduce the issue, actual and expected outcomes,  where you believe the issue is originating from, and any potential solutions you have considered.

### Feature Requests

We would love to hear from you about new features which would improve this app and further the aims of our project. Please provide as much detail and information as possible to show us why you think your new feature should be implemented.

### Pull Requests

If you have developed a patch, bug fix, or new feature that would improve this app, please submit a pull request. It is best to communicate your ideas with the developers first before investing a great deal of time into a pull request to ensure that it will mesh smoothly with the project.

Remember that this project is licensed under the MIT license, and by submitting a pull request, you agree that your work will be, too.

#### Pull Request Guidelines

- Ensure any install or build dependencies are removed before the end of the layer when doing a build.
- Update the README.md with details of changes to the interface, including new plist variables, exposed ports, useful file locations and container parameters.
- Ensure that your code conforms to our existing code conventions and test coverage.
- Include the relevant issue number, if applicable.
- You may merge the Pull Request in once you have the sign-off of two other developers, or if you do not have permission to do that, you may request the second reviewer to merge it for you.

### Attribution

These contribution guidelines have been adapted from [this good-Contributing.md-template](https://gist.github.com/PurpleBooth/b24679402957c63ec426).

## Documentation

See [Frontend Documentation](https://github.com/Lambda-School-Labs/ping-catcher-fe) for details on the fronend of our project.
