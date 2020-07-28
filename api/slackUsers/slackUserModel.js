const db = require("../../database/db-config");

module.exports = {
    add, 
    find,
    findByName,
    findById
   
}

function add({slack_user}) {
    return db('slack_user').insert(slack_user).returning('id');
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

function findByName({slack_user}) {
    console.log("slack user = ", slack_user)
     return db('slack_user').select('id').where({slack_user}).first();
}

function findById({id}) {
    console.log("id = ", id)
    return db.from('slack_user').where({id}).first();
}
