import { Router } from "express";
import {usuarioLogueado, usuarioSinLoguear} from '../extras/user.js';
import session from "express-session";

const router = Router();

router.get('/', usuarioSinLoguear, (req, res) => {
    res.render('index', { layout: false });
})

router.get('/sign-up', (req, res) => {
    res.render('sign-up', { layout: false });
});

router.get('/login', (req, res) => {
    res.render('login',{ layout: false });
});

router.post("/welcomeUser",usuarioSinLoguear, (req, res) => {
    if (req.body.firstName) {
        req.session.nombre = req.body.firstName;
        res.redirect("/welcomeUser");
    } else {
        res.redirect("/");
    }
});

router.get(`/welcomeUser`,usuarioLogueado, (req, res) => {
    let nombre = req.session.nombre
    req.session.cookie.expires = new Date(Date.now() + 30000)
    res.render(`welcomeUser`, {nombre :nombre})
})

router.post('/logout',usuarioLogueado, (req, res)=> {
    let nombre = req.session.nombre
    req.session.destroy((error) => {
        if(error){res.json({status : 'Logout error', body : error})}
        else{res.render('logout', {nombre : nombre})}
    })
})




export default router; 