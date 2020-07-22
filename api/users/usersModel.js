const db = require("../../database/db-config");

module.exports = {
  add,
  findByName,
  find
};

function add({slack_user, username, password}) {
  return db("users").insert({slack_user, username, password }).returning('id');
}

function findByName(username) {
  return db("users").where({ username }).first();
}

function find() {
  return db("users");
}