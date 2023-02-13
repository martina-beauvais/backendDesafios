import express from 'express';
import userDAO from '../../models/userSchema.js';
import { usuarioLogueado, usuarioSinLoguear } from '../../extras/user.js';

const routerPost = express.Router()

routerPost.post('/sign-up', async (req,res) => {
    const {firstName, lastName, email, username, password} = req.body;
    if(!firstName || !email || !username || !password) return res.status(400).send({status: 'error', error: 'Valores incompletos.'});
    const exists  = await userDAO.findOne({email});
    if(exists) return res.status(400).send({status: 'error', error: 'El usuario ha dejado de existir'});
    const newUser = await userDAO.create({
        firstName,
        lastName,
        email,
        username,
        password
    })
    res.send({status: "success", payload: newUser})
})

routerPost.post('/login', async (req, res) => {
    const {username, password} = req.body;
    if(!username || !password) return res.status(400).send({status: "error", error: "Valores incompletos"});
    const user = await userDAO.findOne({username, password});
    if(!user) return res.status(400).send({status:"error",error:"Correo o contraseña inválidos"});
    req.session.user = {
        id: user._id,
        username:user.username,
    }
    res.send({status:"success",message:"Ha iniciado sesión."})
})



export default routerPost; 