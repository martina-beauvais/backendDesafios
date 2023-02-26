import express from 'express';
import viewUser from './src/routes/viewUsers.js';
import __dirname from './utils.js';
import handlebars from 'express-handlebars';
import routerPost from './src/routes/posts/usersPost.js';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import mongoose from 'mongoose';
import path from 'path';
import passport from 'passport';
import initializeStrategies from './src/config/passport-config.js';
import dotenv from 'dotenv';
import routerApi from './src/routes/api/randoms.js';
dotenv.config()

const app = express();
const PORT = process.env.PORT || 8080;
const MONGO_URL = process.env.MONGO_URL
const connection = mongoose.connect(MONGO_URL)


app.use(session({

    store: MongoStore.create({
        mongoUrl: MONGO_URL,
        mongoOptions : {useNewUrlParser : true, useUnifiedTopology: true},}),
    secret: 'viciouscoffee',
    resave: false,
    saveUninitialized: false,
    cookie : {maxAge : 30000}
}))

//PASSPORT 
initializeStrategies();
app.use(passport.initialize());
app.use(passport.session());

//APP USE - VIEWS

const hbs = handlebars.create({
    layoutsDir: path.join(__dirname, '/src/views/layout'),
    extname : 'handlebars'
})

app.engine('handlebars', hbs.engine);
app.set('views', path.join(`${__dirname}/src/views`));
app.set('view engine','handlebars');

app.use(express.static(`${__dirname}/src/public`));
app.use(express.static(`${__dirname}/src/assets`));

app.use(express.json());
app.use(express.urlencoded({extended:true}));

//APP USE - ROUTERS 
app.use('/', viewUser);
app.use('/api/sessions',routerPost);
app.use('/api/randoms', routerApi);

//APP LISTEN
app.listen(PORT, () => console.log(`http://localhost:${PORT}`));