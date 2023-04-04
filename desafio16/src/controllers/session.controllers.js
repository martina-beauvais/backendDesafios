import express from 'express';
import userDAO from '../models/userSchema.js';
import { secretPW } from '../utils';
import uploader from '../services/upload.js';
import passport from 'passport';
import config from '../config/config.js';
import jwt from 'jsonwebtoken';

const register = async (req, res) => {
    try {
        const file = req.file;
        if(!file) return res.status(500).send({status:"error",error:"Error al cargar el archivo"});
        const {firstName, lastName, email, username, password} = req.body;
        if(!firstName || !email || !username || !password) return res.status(400).send({status: 'error', error: 'Valores incompletos.'});
        const exists  = await userDAO.findOne({email});
        if(exists) return res.status(400).send({status: 'error', error: 'El usuario ha dejado de existir'});
        const insertSecretPW = await secretPW(password)
        const user = await userDAO.create({
            firstName,
            lastName,
            email,
            username,
            password: insertSecretPW,
            avatar:`http://localhost:8080/img/${file.filename}`
        });
        res.send({status: "success", payload: user});
    } catch (error) {
        res.status(500).send({status:"error",error:"Error del servidor"})
    }
}

const login = async (req, res) => {
    try{
        const userToken = {
            name:`${req.user.firstName} ${req.user.lastName}`,
            role:req.user.role,
            id:req.user._id,
            avatar:req.user.avatar
        }
        const token = jwt.sign(userToken,config.jwt.SECRET,{expiresIn:"1d"});
        res.cookie(config.jwt.COOKIE,token).send({status:"success",message:"logged in"})
    }catch(error){
        res.status(500).send({status:"error",error:"Error del servidor"})
    }
}

const loginError = async (req, res) => {
    res.status(400).send({status:"error",error:"Error de autenticación"})
}

const githubcallback = (req, res) =>{
    const user = req.user;
    req.session.user = {
        id: user._id,
        email: user.email,
        username: user.username
    };
    res.send({status:"success",message:"Logueado Pero con github:)"});
}

export default {
    register,
    login,
    loginError,
    githubcallback
}