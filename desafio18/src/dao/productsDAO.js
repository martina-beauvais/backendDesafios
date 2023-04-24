import productsSchema from "./mongoDB/productsSchema.js";

export default class productsDAO {
    getProducts = (params) => {
        return productsSchema.find(params).lean();
    };

    createProduct = (product) => {
        return productsSchema.create(product)
    }
}