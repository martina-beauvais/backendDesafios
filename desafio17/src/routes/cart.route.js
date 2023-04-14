import express from 'express';
import cartControllers from '../controllers/cart.controllers.js';

const routesCarrito = express.Router();

routesCarrito.get('/carrito', cartControllers.getCarts);
routesCarrito.get('/carrito/:id', cartControllers.getCartById);
routesCarrito.post(`/add-carrito`, cartControllers.addToCart);
routesCarrito.post(`/add-carrito/:id`, cartControllers.addToCart);
routesCarrito.post(`/carrito`, cartControllers.insertCart);
routesCarrito.put('/carrito/:id', cartControllers.updateCartById);
routesCarrito.delete('/carrito/:id', cartControllers.deleteCartById);

export default routesCarrito;