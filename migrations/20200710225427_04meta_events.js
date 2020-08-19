
exports.up = function(knex) {
  return knex.schema.createTable("meta_events", tbl => {
    tbl.increments();

    tbl.string("text_includes", 255)
    tbl.string("event_type", 255)
    tbl.string("from_user", 255)
    tbl.string("from_team", 255)
    tbl.string("from_channel", 255)
    tbl.string("start_time", 255)
    tbl.string("end_time", 255)
    tbl.string("event_key").unique();
    tbl.string("nickname", 255)
  })
};

exports.down = function(knex) {
  return
  // return new Promise((req, res)=> console.log('not dropping meta_events yet'))
  // return knex.schema.dropTableIfExists('meta_events')
};
