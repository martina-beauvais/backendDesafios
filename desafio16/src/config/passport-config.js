import passport from "passport";
import local from 'passport-local'; 
import userDAO from "../models/userSchema.js";
import { validatePW } from "../../utils.js";
import GithubStrategy from 'passport-github2';

const LocalStrategy = local.Strategy;

const initializeStrategies = () => {
    passport.use('login', new LocalStrategy({
        usernameField: 'email'
    }, async(email,password, done) => {
        if(!email || !password) return done(null, false, {message: 'Valores incompletos. Por favor, revisa todos los campos.'})
        const user = await userDAO.findOne({email});
        if(!user) return done(null, false, {message: 'Datos inválidos.'});
        const invalidPassword = await validatePW(password, user.password);
        if(!invalidPassword) return done(null, false, {message: 'Contraseña inválida. Intenta nuevamente.'});
        return done(null, user);
    }))

    passport.use('github', new GithubStrategy({
        clientID: 'Iv1.8b6ea50c15f30ddf',
        clientSecret: '64aeea6ea1531d864030c896acaf6bbcfb15ecac',
        callbackURL: 'http://localhost:8080/api/sessions/githubcallback' 
    }, async (accessToken, refreshToken, profile, done) => {
        try {
            console.log(profile);
            const {name, email} = profile._json;
            const user = await userDAO.findOne({email});
            if(!user) {
                const newUser = {
                    firstName: name,
                    email,
                    password: '' 
                }
                const result = await userDAO.bulkSave(newUser);
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
        const result = await userDAO.findById({_id: id});
        done(null, result);
    })
}

export default initializeStrategies; 