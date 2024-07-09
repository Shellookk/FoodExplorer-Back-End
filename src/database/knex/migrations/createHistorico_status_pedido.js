exports.up = knex => knex.schema.createTable("order_status_history", table =>{
    table.increments("id")
    table.integer('order_id').references('id').inTable('order')
    table.text("status").notNullable()
    table.timestamp("updated_at").default(knex.fn.now())
})

exports.down = knex => knex.schema.dropTable("order_status_history")