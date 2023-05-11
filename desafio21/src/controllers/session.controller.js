import jwt from 'jsonwebtoken';
import config from '../config/config.js';
import userDTO from '../dao/DTO/userDTO.js';
import { cartService, userService } from '../dao/index.js';
import {createHash} from '../services/auth.js';

const register = async(req, res) => {
    try {
        const file = req.file; 
        if(!file) return res.status(500).send({status:"error", error: "Error loading file."});
        const {firstName, lastName, email, password} = req.body;
        if(!firstName||!lastName||!email||!password) return res.status(400).send({status: "error", error: "Incomplete values."});
        const exists = await userService.getUserBy({email});
        if(exists) return res.status(400).send({status: "error", error: "User already exists."});
        const hashedPassword = await createHash(password);
        const cart = await cartService.createCart();
        const newUser = {
            firstName,
            lastName,
            email,
            password: hashedPassword,
            cart: cart._id,
            avatar:`http://localhost:8080/img/${file.filename}`,
            library: []
        }
        const result = await userService.createUser(newUser)
        res.send({status: "success", message: "New user created"});
    } catch (error) {
        res.status(500).send({status:"error",error:"Error del servidor"})
    }
};

const login = async(req, res) =>{
    try {
        const user = userDTO.getTokenDTO(req.user)
        const userToken = userDTO.getTokenDTO(user);
        const token = jwt.sign(userToken, config.jwt.SECRET, {expiresIn:"1d"});
        res.cookie(config.jwt.COOKIE, token).send({status:"success", message:"Logged in."})
    } catch (error) {
        res.status(500).send({status:"error", error:"Server error."})
    }
};

const loginFail = (req, res) => {
    res.send("Something went wrong.")
};

const githubcallback = (req, res) => {
    const userToken = {
        name:`${req.user.name}`,
        role:'user',
        id:req.user._id
    }

    const token = jwt.sign(userToken,config.jwt.SECRET,{expiresIn:"1d"});
    res.cookie(config.jwt.COOKIE,token).send({status:"success",message:"logged in"});
}

export default {
    register,
    login,
    loginFail,
    githubcallback
};