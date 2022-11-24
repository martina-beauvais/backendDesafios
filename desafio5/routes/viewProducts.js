const Container = require('../api/container.js');
const Productos = new Container('./resources/productos.json');

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

module.exports = router;