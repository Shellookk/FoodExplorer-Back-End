exports.up = knex => knex.schema.createTable("order", table =>{
    table.increments("id")
    table.integer('user_id').references('id').inTable('users')
    table
    .enum("status", ["pendente", "preparando", "entregue", "cancelado"], {useNative: true, enumName: "status" })
    .notNullable().default("pendente")
    table.integer("total_value").notNullable()
    table.timestamp("created_at").default(knex.fn.now())
    table.timestamp("updated_at").default(knex.fn.now())
    table.timestamp("cancellation_date")
})

exports.down = knex => knex.schema.dropTable("order")