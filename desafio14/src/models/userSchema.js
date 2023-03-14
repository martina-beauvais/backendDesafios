import mongoose from "mongoose";

const collection = 'users';

const userSchema = new mongoose.Schema({
    firstName: {
        type: String, 
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    }
});

const userDAO = mongoose.model(collection, userSchema);

export default userDAO;