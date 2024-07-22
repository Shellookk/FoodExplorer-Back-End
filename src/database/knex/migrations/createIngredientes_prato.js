exports.up = function(knex) {
    return knex.schema.createTable('ingredients_plate', table => {
      table.integer('plate_id').unsigned().notNullable();
      table.integer('ingredient_id').unsigned().notNullable();
      
      table.foreign('plate_id').references('id').inTable('plates').onDelete('CASCADE');
      table.foreign('ingredient_id').references('id').inTable('ingredients').onDelete('CASCADE');
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('ingredients_plate');
  };