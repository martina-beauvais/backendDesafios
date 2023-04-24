import express from 'express';
import productsControllers from '../controllers/products.controllers.js';

const routes = express.Router();

routes.get('/products', productsControllers.getProducts);
routes.get('/products/:id', productsControllers.getProductById);
routes.post('/products', productsControllers.insertProduct);
routes.put('/products/:id', productsControllers.updateById);
routes.delete('/products/:id', productsControllers.deleteById);


export default routes