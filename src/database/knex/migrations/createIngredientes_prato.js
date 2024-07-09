exports.up = knex => knex.schema.createTable("ingredients_plate", table =>{
    table.integer('plate_id').references('id').inTable('plates')
    table.integer('ingredient_id').references('id').inTable('ingredients')
    table.primary(['plate_id', 'ingredient_id'])
})

exports.down = knex => knex.schema.dropTable("ingredients_plate")