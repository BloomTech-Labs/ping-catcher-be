exports.up = function (knex) {
  return knex.schema.createTable("events", tbl => {
    tbl.increments();
    tbl.string("type", 255);
    tbl.string("text", 255);
    tbl.string("slack_user").references("slack_user.slack_username");
    tbl.string("team", 255);
    tbl.string("channel", 255);
    tbl.string("timestamp", 255);
    tbl.string("event_timestamp", 255);
  });
};
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("events");
};
