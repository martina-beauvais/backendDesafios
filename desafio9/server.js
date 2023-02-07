import express from "express";
import router from "./routes/routes.js";
import ejs from 'ejs';
import __dirname from "./extras.js";
import path from 'path';

const app = express();
const PORT = 8080;

app.use('/api', router)

//MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(__dirname + '/public'))
app.use(express.static(__dirname + '/assets'))

//VIEW ENGINE
app.set('views', path.join(__dirname, 'views/ejs'));
app.set('view engine', 'ejs');

app.listen(PORT, () => {console.log(`http://localhost:${PORT}`)});