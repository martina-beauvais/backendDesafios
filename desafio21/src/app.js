import express from 'express';
import session from 'express-session';
import mongoose from 'mongoose';
import handlebars from 'express-handlebars';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import dotenv from 'dotenv';
import cors from 'cors';

import viewsRouter from './routes/views.router.js';
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";
import sessionsRouter from "./routes/sessions.router.js";

import config from './config/config.js';
import __dirname from "./utils.js";
import initializePassport from "./config/passport.config.js";

const app = express();
const PORT = process.env.PORT || 8080;
const connection = mongoose.connect("mongodb+srv://martinabeauvais:Necesitas11@coderclustercomision381.asqu6kh.mongodb.net/viciouscoffeeshop?retryWrites=true&w=majority");

dotenv.config()

// HANDLEBARS --
app.engine('handlebars', handlebars.engine());
app.set('views', `${__dirname}/views`);
app.set('view engine', 'handlebars');

// MIDDLEWARES --
app.use(express.static(`${__dirname}/public`));
app.use(express.static(`${__dirname}/assets`));
app.use(express.json());
app.use(cookieParser());
app.use(cors())
app.use(express.urlencoded({extended:true}));

// PASSPORT --
initializePassport();
app.use(passport.initialize());
app.use(session({
    secret: 'viciouscoffee',
    resave: false,
    saveUninitialized: true
}));

// ROUTERS -- 
app.use('/', viewsRouter);
app.use('/api/sessions/', sessionsRouter);
app.use('/api/products/', productsRouter);
app.use('/api/carts', cartsRouter);


app.listen(PORT, () => console.log(`http://localhost:${PORT}`));