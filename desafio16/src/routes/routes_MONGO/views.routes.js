import { Router } from "express";
import {usuarioLogueado, usuarioSinLoguear} from '../../extras/user.js';
import {executePolicies} from '../../middleware/auth.js';
import passport from 'passport';
import viewControllers from "../../controllers/view.controllers.js";

const router = Router();

router.get('/', usuarioSinLoguear, viewControllers.index);
router.get('/home', viewControllers.home);
router.get('/perfil-de-usuario',executePolicies(["AUTHENTICATED"]), viewControllers.perfilUser);
router.get('/loginError', viewControllers.loginError);
router.get('/register', viewControllers.register);
router.get('/login', viewControllers.login);
router.get('/logout', viewControllers.logOut);
router.post('/register', passport.authenticate('register', {redirect:'/error-to-sign-up'}), viewControllers.register);
router.post('/login', passport.authenticate('login',{redirect: ('products')}), viewControllers.login);



export default router; 