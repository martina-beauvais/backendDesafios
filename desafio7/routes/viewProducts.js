const Products = require('../api/classProducts.js');
const Productos = new Products('./resources/productos.json');

let {Router} = require('express');
let router = new Router();


router.get('/', (req, res) => {
    res.render('home');
})

router.get("/products",async(req,res,next)=>{
    try {
        let products = await Productos.getAllProducts();
        res.render('products', {products});
    } catch (error) {
        console.log(error)
    }
});

router.get('/loadProducts', async(req, res, next) => {
    res.render('loadProducts');
})

router.get('/chat', async(req, res, next) => {
    res.render('chats');
})

module.exports = router;