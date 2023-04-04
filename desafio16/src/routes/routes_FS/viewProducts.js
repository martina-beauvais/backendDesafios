import Productos from '../../dao/filesystem/classCart&Product.js';                                                               
import { Router } from 'express';

let views = new Router();

views.get('/', (req, res) => {
    res.render('home');
})

views.get("/products",async(req,res,next)=>{
    try {
        let products = await Productos.getAllProducts();
        res.render('products', {products});
    } catch (error) {
        console.log(error)
    }
});

views.get('/loadProducts', async(req, res, next) => {
    res.render('loadProducts');
})

views.get('/carrito', async(req, res, next) => {
    let product = await Productos.getById();
    res.render('Cart', {product});
})

export default views; 