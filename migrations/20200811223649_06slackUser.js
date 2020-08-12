
exports.up = function(knex) {
  return knex.schema.alterTable('slack_user', tbl => {
    tbl.integer('ranking_id').references("rankings.id").unsigned().onoDelete("CASCADE")
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('slack_user')
};
