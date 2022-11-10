const Container = require('./index') // IMPORTO EL CLASS CONTAINER DEL INDEX
const archivoProductos = new Container('./desafio2/productos.json'); 

let express = require("express");

let app = express();

const server = app.listen(8080 , ()=> {
    console.log(`Server on http://localhost:${server.address().port}`)
})


app.get("/products", async (req, res) => {
    const allProducts = await archivoProductos.getAll()
    res.send(allProducts);;

})
app.get("/productRandom", async (req, res) => {
    const product = await archivoProductos.getRandom()
    res.send(product)
})
app.get("/", (req, res) => {
    res.send('<h1 style="display:flex;justify-content:center;color:#B1B2FF;text-align:center">página principal</h1>')
})

server.on('error', error => {
    console.error(`Error en el servidor. ${error}`)
})