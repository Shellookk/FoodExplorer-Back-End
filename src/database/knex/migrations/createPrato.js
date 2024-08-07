exports.up = knex => knex.schema.createTable("plates", table =>{
    table.increments("id")
    table.text("name").notNullable()
    table.text("avatar").nullable().defaultTo(null)
    table
    .enu("category", ["refeicao", "sobremesa", "bebida"], {useNative: true, enumName: "category" })
    .notNullable().default("refeicao", options={})
    table.float("price").notNullable()
    table.text("description").notNullable()

    table.timestamp("created_at").default(knex.fn.now())
    table.timestamp("updated_at").default(knex.fn.now())
})

exports.down = knex => knex.schema.dropTable("plates")  