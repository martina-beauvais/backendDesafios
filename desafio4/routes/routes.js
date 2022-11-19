const Container = require('../api/products.js') // IMPORTO EL CLASS CONTAINER DESDE LA CARPETA API
const archivoProductos = new Container('./api/productos.json'); 

let {Router} = require('express');
let router = new Router(); 


//GET ALL PRODUCTS
router.get("/",async(req,res,next)=>{
    try {
        const products = await archivoProductos.getAllProducts();
        res.send(products);
    } catch (error) {
        console.log(error)
    }
});

//SEARCH PRODUCT
router.get("/:id", async(req,res,next)=>{
    try {
        let buscarID = req.params.id
        let productoEncontrado = await archivoProductos.getById(buscarID);
        if(productoEncontrado){
            res.json({
                productoEncontrado
            })
        }else{
            res.send('Producto inexistente');
        }
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
            await archivoProductos.saveProduct(newProduct);
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
            await archivoProductos.saveChanges(actualizar)
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
        await archivoProductos.deleteById(id);
        console.log("Producto borrado exitosamente")
        res.send(`Ya no existe el producto con el id: ${id}.`)
    } catch (error) {
        console.log(error)
    }
})

module.exports = router ;
