import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstName: {
        type: String, 
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    direccion: {
        type: Number
    },
    numero: {
        type: Number,
        unique: true
    },
    edad: {
        type: Number
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    role: {
        type: String,
        default: 'user'
    },
    avatar: String
});
mongoose.models = {};


export default mongoose.model('users', userSchema);