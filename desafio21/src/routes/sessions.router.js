import { Router } from "express";
import session from "express-session";
import passport from "passport";
import uploader from "../services/upload.js";
import sessionController from "../controllers/session.controller.js";

const router = Router();

router.post('/register', uploader.single('avatar'), sessionController.register);
router.post('/login', passport.authenticate('login', {failureRedirect:'/api/sessions/loginFail', session:true}), sessionController.login);
router.get('/loginFail', sessionController.loginFail);
router.get('/github', passport.authenticate('github'), (req, res) => {});
router.get('/githubcallback', passport.authenticate('github'), sessionController.githubcallback);

export default router;