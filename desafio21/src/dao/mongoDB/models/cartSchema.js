import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    products: [
        {
            _id:{
                type: mongoose.SchemaTypes.ObjectId,
                ref: 'products'
            }
        }
    ]
});

mongoose.models = {};

export default mongoose.model('carts', cartSchema);