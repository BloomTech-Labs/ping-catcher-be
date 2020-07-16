const db = require("../database/db-config")

module.exports = {
    add,
    findByName,
    findById
}

function add(slack_user) {
    return db('slack_user').insert(slack_user);
}

function findByName({slack_user}) {
    console.log(slack_user)
    return db('slack_user').where({slack_user});
}

function findById({id}) {
    return db('slack_user').where({id}).first();
}
