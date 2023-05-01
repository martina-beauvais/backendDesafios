import cartsSchema from './mongoDB/cartsSchema.js';

export default class cartsDAO {
    getCarts = (params) => {
        return cartsSchema.find(params).lean();
    };

    createCart = (cart) => {
        return cartsSchema.create(cart)
    }
}