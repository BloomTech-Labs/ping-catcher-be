const db = require("../database/db-config");

module.exports = {
  add,
  findByName,
};

function add(username, sub) {
  return db("users").insert({ username, password: sub });
}

function findByName(username) {
  return db("users").where({ username }).first();
}
