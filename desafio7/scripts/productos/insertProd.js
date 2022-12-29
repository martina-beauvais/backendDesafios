/* REQUIRE a mis librerias y dependencias */
const { options } = require("../../options/configMYSQL")
const knex = require("knex")(options)

//Productos a guardar

const productos = [
    {"id": 1, "title": "Caramel Macchiato", "price": 250, "stock": 2},
    {"id": 2, "title": "Iced Latte", "price": 350, "stock": 132},
    {"id": 3, "title": "Espresso", "price": "170", "stock": 4},
    {"id": 4, "title": "Vanilla Latte", "price": "350", "stock": 4325},
    {"id": 5, "title": "Latte macchiato","price": 350,"stock": 5436},
    {"id": 6, "title": "Americano", "price": "150", "stock": 7445},
    {"id": 7, "title": "London Fog", "price": "400", "stock": 448},
    {"id": 8, "title": "Iced Chai Tea Latte", "price": "380", "stock":59},
    {"id": 9, "title": "Strawberry Lemonade", "price": "350", "stock": 430},
    {"id": 10, "title": "Irish Cream Cold Brew", "price": "350", "stock": 3411},
    {"id": 11, "title": "Red Velvet Frappe", "price": "400", "stock": 5312},
    {"id": 12, "title": "Cinnamon Roll", "price": "260", "stock": 1533},
    {"id": 13, "title": "Choc. Chip Cookie", "price": "50", "stock": 134}
]

// INSERT 
knex("productos").insert(productos)
    .then(() => console.log("Productos guardados !"))
    .catch((error) => {console.log(error); throw error})
    .finally(() => {
        knex.destroy()
    })


// DELETE WHERE 
knex.from("productos").where("price", ">", "500").del()
    .then(() => console.log("Todos los productos con precio > 500, han sido eliminados."))
    .catch((error) => {console.log(error); throw error})
    .finally(() => {
        knex.destroy()
    })


// DELETE
knex.from("productos ").del()
    .then(() => console.log("Todos los productos han sido eliminados."))
    .catch((error) => {console.log(error); throw error})
    .finally(() => {
        knex.destroy()
    })