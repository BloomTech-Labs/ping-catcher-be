const db = require("../../database/db-config");

module.exports = {
    add, 
    find,
    findByName,
    findById,
    update
}

function add({slack_username, user_id, ranking_id}) {
    return db('slack_user').insert({slack_username, user_id, ranking_id}).returning('slack_username');
}

function find() {
    return db("slack_user");
  }

function findByName({slack_username}) {
    console.log("slack user = ", slack_username)
     return db('slack_user').where({slack_username}).first();
}

function findById({id}) {
    console.log("id = ", id)
    return db.from('slack_user').where({id}).first();
}

function update({slack_username, update}) {
    console.log('update function', update)
    return db('slack_user').where({slack_username}).update({...update});
}
