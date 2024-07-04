exports.up = knex => knex.schema.createTable("ingredientes_prato", table =>{
    table.integer('prato_id').references('id').inTable('pratos')
    table.integer('ingrediente_id').references('id').inTable('ingredientes')
    table.primary(['prato_id', 'ingrediente_id'])
})

exports.down = knex => knex.schema.dropTable("ingredientes_prato")