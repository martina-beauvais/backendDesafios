import Productos from '../dao/filesystem/classCart&Product.js';                                                               
import {administradores} from './administrador.js'
import { Router } from 'express';

let load = new Router();

//GET ALL PRODUCTS
load.get("/",async(req,res,next)=>{
    try {
        const products = await Productos.getAllProducts();
        res.send(products);
    } catch (error) {
        console.log(error)
    }
});

//SEARCH PRODUCT
load.get("/:id", async(req,res,next)=>{
    try {
        let idFilter = req.params.id
        let productoFilter = await Productos.getById(idFilter);
        res.send(productoFilter);
    } catch (error) {
        console.log(error);
    }
});

//ADD PRODUCT
load.post("/", administradores, async(req,res,next)=>{
    try {
        let {title, description, code,price,thumbnail, timestamp} = req.body
        if(!title||!price||!thumbnail){
            console.log("Faltan valores.");
        }else{
            let newProduct = {
                timestamp,
                title,
                description,
                code,
                price,
                thumbnail
            };
            await Productos.saveProduct(newProduct);
            res.redirect('http://localhost:8080/products')
            res.send(`ID: ${newProduct.id},
            TIMESTAMP: ${newProduct.timestamp}
            TITLE: ${newProduct.title},
            PRICE: $ ${newProduct.price},
            THUMBNAIL: ${newProduct.thumbnail}`);
        }

    } catch (error) {
        console.log(error);
    }
});

//UPDATE PRODUCT
load.put("/:id", administradores, async(req,res,next)=>{
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
            res.send(`Los datos del producto ${actualizar.title} se han actualizado.`)
        }
    } catch (error) {
        console.log(error)
    }
});


//DELETE PRODUCT
load.delete("/:id", administradores, async(req,res,next)=>{
    try {
        let id = req.params.id;
        await Productos.deleteById(id);
        console.log("Producto borrado exitosamente")
        res.send(`Ya no existe el producto con el id: ${id}.`)
    } catch (error) {
        console.log(error)
    }
})

export default load;