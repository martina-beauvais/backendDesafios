const Products = require('../api/classProducts.js');
const Productos = new Products('./resources/productos.json');

const {Router} = require('express');
let router = new Router();

//GET ALL PRODUCTS
router.get("/",async(req,res,next)=>{
    try {
        const products = await Productos.getAllProducts();
        res.send(products);
    } catch (error) {
        console.log(error)
    }
});

//SEARCH PRODUCT
router.get("/:id", async(req,res,next)=>{
    try {
        let idFilter = req.params.id
        let productoFilter = await contenedor.getById(idFilter);
        res.send(productoFilter);
    } catch (error) {
        console.log(error);
    }
});

//ADD PRODUCT
router.post("/", async(req,res,next)=>{
    try {
        let {title,price,thumbnail} = req.body
        if(!title||!price||!thumbnail){
            console.log("Faltan valores.");
        }else{
            let newProduct = {
                title,
                price,
                thumbnail
            };
            await Productos.saveProduct(newProduct);
            res.redirect('http://localhost:8080/products')
            res.send(`ID: ${newProduct.id},
            TITLE: ${newProduct.title},
            PRICE: $ ${newProduct.price},
            THUMBNAIL: ${newProduct.thumbnail}`);
        }

    } catch (error) {
        console.log(error);
    }
});

//UPDATE PRODUCT
router.put("/:id", async(req,res,next)=>{
    try {
        let id = req.params.id;
        let {title,price,thumbnail} = req.body
        if(!title || !price || !thumbnail){
            res.send("Faltan valores (2).")
        }else{
            let actualizar ={
                id,
                title,
                price,
                thumbnail
            };
            await Productos.saveChanges(actualizar)
            res.send(`El título del producto ${actualizar.title} se ha actualizado.`)
        }
    } catch (error) {
        console.log(error)
    }
});


//DELETE PRODUCT
router.delete("/:id", async(req,res,next)=>{
    try {
        let id = req.params.id;
        await Productos.deleteById(id);
        console.log("Producto borrado exitosamente")
        res.send(`Ya no existe el producto con el id: ${id}.`)
    } catch (error) {
        console.log(error)
    }
})

module.exports = router;