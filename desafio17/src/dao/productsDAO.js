import productsSchema from "./mongoDB/productsSchema";

export default class productsDAO {
    getProducts = (params) => {
        return productsSchema.find(params).lean();
    };

    createProduct = (product) => {
        return productsSchema.create(product)
    }
}