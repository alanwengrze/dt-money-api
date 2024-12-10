//criar a tabela notes
exports.up = knex => knex.schema.createTable("transactions", table => {
  table.increments("id").primary();
  table.text("description").notNullable();
  table.float("price").notNullable();
  table.text("category").notNullable();
  table.enum("type", ["income", "outcome"], 
    { useNative: true, enumName: "types" }).notNullable();
  table.timestamp("created_at").defaultTo(knex.fn.now());
  table.timestamp("updated_at").defaultTo(knex.fn.now());
});

//remover a tabela
exports.down = knex => knex.schema.dropTable("transactions");
