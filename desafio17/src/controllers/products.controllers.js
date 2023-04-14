import { productsService } from '../dao/index.js'

//get all the products
const getProducts = async (req, res) => {
    const productos = await productsService.getProducts();
    res.send({status: "success", paylorad: productos})
}

//get a product by id 
const getProductById = async (req, res) => {
    const id = req.params.id;
    const productoById = await productsService.findOne({_id: id})
    res.send({data: productoById})
}

//insert a new product
const insertProduct = async (req, res) => {
    const file = req.file;
    const {title, description, code, price, stock} = req.body;
    if(!title || !description || !code || !price || !stock) return res.send(400).send({status: "error", message: "Incomplete values"});
    const product = {
        title,
        description,
        code,
        price,
        stock,
        thumbnail: `${req.protocol}: //${req.hostname}:${process.env.PORT}/img/${file.filename}`    
    }
    const result = await productsService.createProduct(product);
    res.send({status: "success", payload: result});
}

//update an old product by id
const updateById = (req, res) => {
    const id = req.params.id;
    const body = req.body;
    productsService.updateOne(
        {_id: id},
        body,
        (err, docs) =>{
            res.send({data: docs})
        }
    )
}

//delete a product by id 
const deleteById = (req, res) => {
    const id = req.params.id;
    productsService.deleteOne(
        {_id: id},
        (err, docs) =>{
            res.send({data: docs})
        }
    )
}

export default {
    getProducts,
    getProductById,
    insertProduct,
    deleteById,
    updateById
}