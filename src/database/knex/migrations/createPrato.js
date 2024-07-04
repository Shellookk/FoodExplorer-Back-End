exports.up = knex => knex.schema.createTable("pratos", table =>{
    table.increments("id")
    table.text("nome").notNullable()
    table.text("avatar")
    table
    .enu("categoria", ["refeicao", "sobremesa", "bebida"], {useNative: true, enumName: "categoria" })
    .notNullable().default("refeicao", options={})

    table.integer("preco").notNullable()
    table.text("descricao").notNullable()

    table.timestamp("created_at").default(knex.fn.now())
    table.timestamp("updated_at").default(knex.fn.now())
})

exports.down = knex => knex.schema.dropTable("pratos")  