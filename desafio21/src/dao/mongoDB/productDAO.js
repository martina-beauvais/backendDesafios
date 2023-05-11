import productSchema from "./models/productSchema.js";

export default class productDAO{
    getProducts = (params) => {
        return productSchema.find(params).lean();
    };
    getProductsById = (params) => {
        return productSchema.findOne(params).lean();
    };
    createProduct = (product) => {
        return productSchema.create(product);
    }
};