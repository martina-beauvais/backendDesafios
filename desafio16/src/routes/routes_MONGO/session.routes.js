import express from 'express';
import userDAO from '../../models/userSchema.js';
import { secretPW } from '../../utils.js';
import uploader from '../../services/upload.js';
import passport from 'passport';
import config from '../../config/config.js';
import jwt from 'jsonwebtoken';
import sessionControllers from '../../controllers/session.controllers.js';

const routerPost = express.Router();

routerPost.post('/register',uploader.single('avatar'), sessionControllers.register);
routerPost.post('/login',passport.authenticate('login'),sessionControllers.login);
routerPost.get('/loginError', sessionControllers.loginError);
routerPost.get('/github', passport.authenticate('github'), (req, res) => {});
routerPost.get('/githubcallback', passport.authenticate('github'), sessionControllers.githubcallback);


export default routerPost; 