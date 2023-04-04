import express from 'express';
import {deleteById, getProductById, getProducts, insertProduct, updateById} from '../dao/mongoDB/products.js'; 

const routes = express.Router();

routes.get('/products', getProducts);
routes.get('/products/:id', getProductById);
routes.post('/products', insertProduct);
routes.put('/products/:id', updateById);
routes.delete('/products/:id', deleteById);


export default routes