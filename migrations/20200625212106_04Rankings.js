
exports.up = function(knex) {
  return knex.schema
    .createTable("rankings", tbl => {
      tbl.increments();
      tbl.integer('user_id').references('users.id').notNullable().unsigned().onDelete('CASCADE')
  })
    .createTable("thread_ranking", tbl => {
        tbl.increments();
        tbl.integer('rankings_id').references('rankings.id').notNullable().unsigned().onDelete('CASCADE')
        tbl.integer('slack_user').references('slack_user.id').unsigned().onDelete('CASCADE')
        tbl.integer('event_id').references('events.id').unsigned().onDelete('CASCADE')
        tbl.string('last_accessed', 255)
        tbl.string('nickname', 255).notNullable()
  })
};

exports.down = function(knex) {
    return knex.schema
        .dropTableIfExists('thread_ranking')
        .dropTableIfExists('rankings')
};
