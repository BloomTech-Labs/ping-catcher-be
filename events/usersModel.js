const db = require("../database/db-config")

const db = require('../database/db-config');

module.exports = {
    add, 
    findByName
}

function add(username) {
    return db('users').insert({username})
}

function findByName(username) {
    return db('users').where({username}).first()
}
