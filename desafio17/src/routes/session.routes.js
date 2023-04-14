import express from 'express';
import uploader from '../services/upload.js';
import passport from 'passport';
import sessionControllers from '../controllers/session.controllers.js';

const routerPost = express.Router();

routerPost.post('/register',uploader.single('avatar'), sessionControllers.register);
routerPost.post('/login',passport.authenticate('login'),sessionControllers.login);
routerPost.get('/loginError', sessionControllers.loginError);
routerPost.get('/github', passport.authenticate('github'), (req, res) => {});
routerPost.get('/githubcallback', passport.authenticate('github'), sessionControllers.githubcallback);


export default routerPost; 