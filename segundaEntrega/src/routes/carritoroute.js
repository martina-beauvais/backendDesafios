import express from 'express';
import {addToCart, deleteCartById, getCartById, getCarts, insertCart, updateCartById} from '../dao/mongoDB/carrito.js';

const routesCarrito = express.Router();

routesCarrito.get('/carrito', getCarts);
routesCarrito.get('/carrito/:id', getCartById);
routesCarrito.post(`/add-carrito`, addToCart);
routesCarrito.post(`/add-carrito/:id`, addToCart);
routesCarrito.post(`/carrito`, insertCart);
routesCarrito.put('/carrito/:id', updateCartById);
routesCarrito.delete('/carrito/:id', deleteCartById);

export default routesCarrito;