exports.up = knex => knex.schema.createTable("pagamento", table =>{
    table.increments("id")
    table.integer('pedido_id').references('id').inTable('pedidos')
    table
    .enum("tipo_pagamento", ["pix","credito"], {useNative: true, enumName: "tipo_pagamento" }).notNullable()
    table.integer("valor").notNullable()
    table.timestamp("created_at").default(knex.fn.now())
    table.timestamp("payment_date").default(knex.fn.now())
})

exports.down = knex => knex.schema.dropTable("pedidos")