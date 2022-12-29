const { options } = require("../../options/configMYSQL")
const knex = require("knex")(options)

knex.schema.createTable("productos", table => {
    table.increments("id")
    table.string("title")
    table.integer("price")
    table.integer("stock")
})
    .then(() => console.log("Tabla de productos creada."))
    .catch((error) => { console.log(error); throw error})
    .finally(() => {
        knex.destroy();
    })

