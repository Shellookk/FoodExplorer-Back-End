exports.up = knex => knex.schema.createTable("historico_status_pedido", table =>{
    table.increments("id")
    table.integer('id_pedido').references('id').inTable('pedidos')
    table.text("status").notNullable()
    table.timestamp("updated_at").default(knex.fn.now())
})

exports.down = knex => knex.schema.dropTable("historico_status_pedido")