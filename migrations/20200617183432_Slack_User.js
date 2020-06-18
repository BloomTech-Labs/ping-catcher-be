exports.up = function (knex) {
  return knex.schema.createTable('slack_user', (tbl) => {
    tbl.increments();

    tbl.string('slack_user', 255).notNullable().unique();
    tbl.integer('user_id').notNullable.references("users.id").unsigned().onDelete("CASCADE")
  });
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists('slack_user')
};
