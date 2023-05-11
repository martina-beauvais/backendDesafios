import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: {type: String, unique: true},
    username: {type: String, required: true, unique: true},
    password: String,
    cart: {type: mongoose.SchemaTypes.ObjectId, ref: 'carts'},
    role: {type: String, default: 'user'},
    avatar: String,
    library: [
        {
            product: {
                type: mongoose.SchemaTypes.ObjectId,
                ref:'products'
            },
            purchase: Date
        }
    ]
});

mongoose.models = {};

export default mongoose.model('users', userSchema);