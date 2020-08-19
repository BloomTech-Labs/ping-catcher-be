
exports.up = function(knex) {
  return knex.schema.alterTable('meta_events', tbl => {
    tbl.string('event_key')
  });
};

exports.down = function(knex) {
  return
};