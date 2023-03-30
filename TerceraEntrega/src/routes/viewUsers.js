import { Router } from "express";
import {usuarioLogueado, usuarioSinLoguear} from '../extras/user.js';
import {executePolicies} from '../middleware/auth.js';
import {getUsers} from '../dao/mongoDB/user.js';
import session from "express-session";
import passport from 'passport';


const router = Router();

router.get('/', usuarioSinLoguear, (req, res) => {
    res.render('index', { layout: false });
})

router.get('/home', (req, res) => {
    res.render('home', {layout: false})
})

router.get('/perfil-de-usuario',executePolicies(["AUTHENTICATED"]), (req, res) => {
    res.render('perfil-de-usuario', {user:req.user})
})

router.get('/loginError', (req, res) => {
    res.render('loginError', {layout: false})
})

router.get('/register', (req, res) => {
    res.render('register', { layout: false });
});

router.post('/register', (req, res) =>{
    passport.authenticate('register', {redirect:'/error-to-sign-up'})
})

router.post('/login', (req,res) =>{
    passport.authenticate('login',{redirect: ('products')} )
})

router.get('/login', (req, res) => {
    //req.logger.debug('Prueba')
    res.render('login',{ layout: false });
});

router.get('/logout', (req, res) => {
    const user = req.user;
    res.render('logout', {user})
})
export default router; 