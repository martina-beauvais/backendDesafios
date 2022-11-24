const express = require('express');
const app = express();


const PORT = 3001;

// MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/assets"));


// ROUTES
let views = require('./routes/viewProducts.js')
let routes = require('./routes/loadProducts.js')

//VIEW ENGINE
app.set('views', __dirname + '/views/pug');
app.set('view engine', 'pug');

app.use("/", views);
app.use("/products", routes);

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));