const db = require("../../database/db-config");

module.exports = {
  add,
  findByName,
  find
};

function add({slack_user, username, password}) {
  return db("users").insert({slack_user, username, password }).returning('id');
}

function findByName({slack_user}) {
  console.log("user = ", slack_user)
  return db("users").where({ slack_user }).first();
}

function find() {
  return db("users");
}

function findById({id}) {
  return db("users").where({id});
}