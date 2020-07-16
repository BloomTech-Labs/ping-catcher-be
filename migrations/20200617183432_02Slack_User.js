exports.up = function (knex) {
  return knex.schema.createTable('slack_user', tbl => {
    // tbl.increments();

    tbl.string('id', 255).notNullable().primary();
    tbl.integer('user_id').references("users.id").unsigned().onDelete("CASCADE");
  });
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists('slack_user')
};
