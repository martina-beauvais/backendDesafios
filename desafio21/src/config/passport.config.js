import passport from "passport";
import local from 'passport-local';
import GithubStrategy from 'passport-github2';
import { userService } from "../dao/index.js";
import { validatePSW } from "../services/auth.js";
import config from "./config.js";

const LocalStrategy = local.Strategy;

const initializePassport = () => {
    passport.use('login', new LocalStrategy({usernameField:'email'}, async(email,password,done) => {
        if(email===config.app.ADMIN_USER&&password===config.app.ADMIN_PWD){
            return done(null, {_id:0, firstName: "Admin", role: "admin"})
        };
        const user = await userService.getUserBy({email});
        if(!user) return done(null, false, {message: "The user does not exist."});
        if(!validatePSW(password, user.password)) return done(null, false, {message: "Incorrect password."});
        return done(null, user);
    }));
    passport.use('github', new GithubStrategy({
        clientID: 'Iv1.8b6ea50c15f30ddf',
        clientSecret: '64aeea6ea1531d864030c896acaf6bbcfb15ecac',
        callbackURL: 'http://localhost:8080/api/sessions/githubcallback' 
    }, async (accesToken, refreshToken,profile, done) => {
        try {
            console.log(profile);
            const {name, email} = profile._json;
            const user = await userService.getUserBy({email});
            if(!user) {
                const newUser = {
                    firstName: name,
                    email,
                    password: '' 
                }
                const result = await userService.createUser(newUser);
                return done(null, result);
            }
            done(null, user)
        } catch (error) {
            done(error);
            console.log('ERROR EN PASSPORT - GITHUB')
        }
    }))

    passport.serializeUser((user, done) => {
        done(null, user._id);
    })
    passport.deserializeUser(async(id, done) => {
        const result = await userService.getUserBy({_id: id});
        done(null, result);
    })
};

export default initializePassport; 