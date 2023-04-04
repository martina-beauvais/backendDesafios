import config from './src/config/config.js';
import dotenv from 'dotenv';
import express from 'express';
import cookieParser from 'cookie-parser';
import handlebars from 'express-handlebars';
import initializeStrategies from './config/passport-config.js';
import mongoose from 'mongoose';
import nodemailer from 'nodemailer';
import passport from 'passport';
import path from 'path';
import pkg from 'winston';
import router from './routes/routes_MONGO/info.js'
import routerPost from './routes/routes_MONGO/session.routes.js';
import routes from './routes/routes_MONGO/routes.js';
import routesCarrito from './routes/routes_MONGO/carritoroute.js';
import session from 'express-session';
import viewUser from './routes/routes_MONGO/views.routes.js'
import __dirname from './utils.js';
import { addLoger, levels } from './middleware/loggers.js';


const { logger } = pkg;
const app = express();
const PORT = process.env.PORT || 8080;
const connection = mongoose.connect(config.mongo.URL)

dotenv.config()
//PASSPORT
initializeStrategies();
app.use(passport.initialize());
app.use(passport.session());

//APP USE - VIEWS
const hbs = handlebars.create({
    layoutsDir: path.join(__dirname, '/src/views/layout'),
    extname: 'handlebars'
})

app.use(express.static(`${__dirname}/src/public`));
app.use(express.static(`${__dirname}/src/assets`));

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser())

app.engine('handlebars', hbs.engine);
app.set('views', path.join(`${__dirname}/src/views`));
app.set('view engine', 'handlebars');

//APP USE - ROUTERS
app.use('/', viewUser);
app.use('/api/sessions', routerPost);
app.use('/info', router);
app.use(routes);
app.use(routesCarrito);

//APP USE - LOGGER 
app.use(addLoger);

app.get('/pruebaLogger', (req, res) => {
    levels;
    res.send("ok");
})

app.get('/',(req,res)=>{
    res.send(`Petición atendida por ${process.pid}`)
})

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
