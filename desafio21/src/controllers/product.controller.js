import { productService } from "../dao/index.js";

const getProducts = async(req, res) => {
    const productos = await productService.getProducts();
    res.send({status: "success", payload: productos})
};

const getProductById = async (req, res) => {
    const id = req.params.id;
    const productoById = await productService.findOne({_id: id})
    res.send({data: productoById}) 
};

const createProduct = async(req, res) => {
    const file = req.file;
    const {title, description, code, price, category} = req.body;
    if(!title || !description || !code || !price) return res.status(400).send({stauts: "error", error: "Incomplete values."});
    const product = {
        title, 
        description, 
        code, 
        price, 
        category,
        image:`${req.protocol}://${req.hostname}:${process.env.PORT}/img/${file.filename}`
    };
    const result = await productService.createProduct(product);
    res.send({status: "success", payload: result});
}

export default{
    getProducts,
    getProductById,
    createProduct
};