exports.up = function (knex) {
  return knex.schema.createTable('slack_user', tbl => {
    tbl.increments();

    tbl.string('slack_username', 255).notNullable().unique();
    tbl.integer('user_id').references("users.id").unsigned().onDelete("CASCADE");
    // tbl.integer('ranking_id').references("rankings.id").unsigned().onDelete("CASCADE");
  });
};

exports.down = function (knex) {
    return knex.schema
      // .dropTableIfExists('slack_user')
      .dropTableIfExists('thread_ranking')
      // .dropTableIfExists('rankings')
<<<<<<< HEAD
};
=======
};
>>>>>>> fb2b01f30c144e26a6ce2c59d75ba7c69ddf4fb7
