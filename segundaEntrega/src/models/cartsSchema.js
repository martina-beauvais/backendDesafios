import mongoose from "mongoose";

const cartsSchema = new mongoose.Schema(
    {
        title: { type: String, required: true, unique: true },
        quantify: { type: Number, required: true },
        price: { type: Number, required: true },
    },
    {
        timestamps: true
    }
)

mongoose.models = {};

export default mongoose.model('carts', cartsSchema);
