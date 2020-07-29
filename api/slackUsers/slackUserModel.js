const db = require("../../database/db-config");

module.exports = {
    add, 
    find,
    findByName,
    findById
   
}

function add({slack_username, user_id}) {
    return db('slack_user').insert({slack_username, user_id}).returning('slack_username');
}

function find() {
    return db("slack_user");
  }

// function findByName({slack_user}) {
//     console.log("slack user = ", slack_user)
//      db("slack_user")
//         .then(res => {
//             console.log(res)
//         }) .catch(err => {
//          console.log(err)
//      })
// }

function findByName({slack_username}) {
    console.log("slack user = ", slack_username)
     return db('slack_user').select('id').where({slack_username}).first();
}

function findById({id}) {
    console.log("id = ", id)
    return db.from('slack_user').where({id}).first();
}
