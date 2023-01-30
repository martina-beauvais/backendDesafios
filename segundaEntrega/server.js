import express from 'express';
import routes from './src/routes/routes.js';
import routesCarrito from './src/routes/carritoroute.js';
import connect from './src/db/mongodb.js';
import mongoose from 'mongoose';

import views from './src/routes_FS/viewProducts.js';
import load from './src/routes_FS/loadProducts.js';
import carrito from './src/routes_FS/Cart.js';

mongoose.set('strictQuery', true)

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('./public'))
app.use(express.static('./assets'))
app.use(routes);
app.use(routesCarrito);

//VIEWS
app.set('views', 'views/ejs');
app.set('view engine', 'ejs');

// ROUTES -- FILESYSTEM
app.use("/", views);
app.use("/api/productos", load);
app.use("/api/carrito", carrito);

app.listen(PORT, () =>{
    console.log(`http://localhost:${PORT}`)
})

connect()