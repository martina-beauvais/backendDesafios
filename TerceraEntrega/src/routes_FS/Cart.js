import Carrito from '../dao/filesystem/classCart&Product.js';                                                               
import Productos from '../resources/productos.json' assert { type: "json" };
import { Router } from 'express';

let carrito = new Router();

carrito.post('/', async (req, res,next) => {
    let cart = Object.keys(req.body).length === 0 ? [] : req.body
    if (!cart) {
        console.log('ERROR EN POST DE CART')
    } else {
        await Carrito.newCart();
        res.json({
            nuevo_carrito: cart
        })
    }
}) 

carrito.get('/:id/products', async (req, res, next) => {
    let cart = await Carrito.getById(req.params.id)
    if(cart){
        res.json({products : cart.products})}
    else{res.status(404).send('ID not found')}
})

carrito.delete('/:id', async (req, res) => {
    let id = req.params.id
    try {
        let deleted = await Carrito.deleteById(id)
        res.json({deleted_product : deleted})
    } catch (error) {
        res.status(400).send(`${error}`)
    }
})

carrito.post('/:id/products', async (req, res)=> {
    let cart = await Carrito.getById(req.params.id)
    let body = req.body
    let product = await Productos.getById(body.id)
    if(cart && product){
        cart.products.push(product)
        await Carrito.updateCart(cart)
        res.json({
            on_cart : cart,
            nuevoProducto : product
        })
    }
    else{res.status(404).send('Cart ID or Product ID not found')}
})
carrito.delete('/:id/products/:id_prod', async (req, res)=> {
    let cart = await Carrito.getById(req.params.id);
    let product = await Productos.getById(req.params.id_prod);
    cart ? product ? cart.products.some(element => element.id === product.id) ? (await Carrito.updateCart({...cart, "products" : cart.products.filter(element => element.id != product.id)}), res.json({deleted_product : product})) : 
        res.status(404).send('Product is not in cart') :
            res.status(404).send('Product ID not found') :
                res.status(404).send('Cart ID not found');
})

export default carrito;