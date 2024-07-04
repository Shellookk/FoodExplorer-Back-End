exports.up = knex => knex.schema.createTable("itens_pedido", table =>{
    table.integer('pedido_id').references('id').inTable('pedidos')
    table.integer('prato_id').references('id').inTable('pratos')
    table.primary(['pedido_id', 'prato_id'])

})

exports.down = knex => knex.schema.dropTable("itens_pedido")