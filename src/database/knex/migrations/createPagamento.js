exports.up = knex => knex.schema.createTable("payment", table =>{
    table.increments("id")
    table.integer('order_id').references('id').inTable('order')
    table
    .enum("type_payment", ["pix","credito"], {useNative: true, enumName: "type_payment" }).notNullable()
    table.integer("value").notNullable()
    table.timestamp("created_at").default(knex.fn.now())
    table.timestamp("payment_date").default(knex.fn.now())
})

exports.down = knex => knex.schema.dropTable("payment")