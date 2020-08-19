
exports.up = function(knex) {
  return knex.schema.alterTable('meta_event', tbl => {
    tbl.string('event_key')
  });
};

exports.down = function(knex) {
  return
};