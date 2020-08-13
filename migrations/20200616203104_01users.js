exports.up = function (knex) {
  return knex.schema.createTable("users", (tbl) => {
    tbl.increments();
    tbl.string("slack_user", 255).unique();
    tbl.string("username", 255).unique().notNullable();
    tbl.string("password", 255);
  });
};

exports.down = function (knex) {
  return knex.schema
  .dropTableIfExists('meta_events')
  .dropTableIfExists('slack_user')
  .dropTableIfExists('rankings')
  .dropTableIfExists("users");
};
