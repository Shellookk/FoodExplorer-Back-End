exports.up = knex => knex.schema.createTable("itens_order", table =>{
    table.integer('order_id').references('id').inTable('order')
    table.integer('plate_id').references('id').inTable('plates')
    table.primary(['order_id', 'plate_id'])

})

exports.down = knex => knex.schema.dropTable("itens_order")