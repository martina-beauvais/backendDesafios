import mongoose from 'mongoose';

const productsSchema = new mongoose.Schema(
    {
        title: {type: String, required: true},
        description: {type: String, required: true},
        code: {type: String, required: true},
        thumbnail: {type: String, required: true},
        price: {type: Number, required: true},
        stock : {type: Number, required: true},
        inCart: { type: Boolean, default: false }
    },
    {
        timestamps: true
    }
);

mongoose.models = {};

export default mongoose.model('productos', productsSchema);