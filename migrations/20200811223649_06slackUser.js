
exports.up = function(knex) {
  return knex.schema.alterTable('slack_user', tbl => {
    tbl.integer('ranking_id').unsigned()
  });
};

exports.down = function(knex) {

};
