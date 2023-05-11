import cartSchema from "./models/cartSchema.js";

export default class cartDAO {
    createCart = (products) => {
        return cartSchema.create({products:[]});
    };
    getCarts = (params) => {
        return cartSchema.find(params).lean();
    };
    getCartById = (id) => {
        return cartSchema.findOne({_id: id}).lean();
    };
    updateCart = (id, cart) => {
        return cartSchema.findOneAndUpdate(id, {$set:cart})
    }
};