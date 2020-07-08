const db = require("../database/db-config")

module.exports = {
    add,
    findByName,
    findById
}

function add(slack_user) {
    return db('slack_user').insert(slack_user).returning('id');
}

async function findByName(slack_user) {
     return await db('slack_user').select("id").where({slack_user}).first();
}

function findById({id}) {
    return db('slack_user').where({id}).first();
}
