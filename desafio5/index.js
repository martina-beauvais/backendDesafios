// Las plantillas que se me han hecho más fáciles para utilizar fueron pug y handlebars; 
// principalmente handlebars ante su similitud con el html. 

const express = require('express');
const app = express();
const handlebars = require('express-handlebars');

const PORT= 8080;

let views = require('./routes/viewProducts.js')
let routes = require('./routes/loadProducts.js')

// MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/assets"));


// VIEW ENGINE 
app.engine('handlebars', handlebars.engine());
app.set('views',__dirname + '/views/handlebars');
app.set('view engine', 'handlebars');

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));

app.use("/", views);
app.use("/products", routes);
