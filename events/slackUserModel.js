const db = require("../database/db-config")

module.exports = {
    add,
    findByName
}

function add(slack_user) {
    return db('slack_user').insert(slack_user, 'id')
}

function findByName(slack_user) {
    return db('slack_user').where({slack_user}).first()
}