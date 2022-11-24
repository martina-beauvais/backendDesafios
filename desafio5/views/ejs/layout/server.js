const express = require('express');
const app = express();

const PORT = 3002; 

//ROUTES
let views = require('./routes/viewProducts.js')
let routes = require('./routes/loadProducts.js')

//MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/assets"));

//VIEW ENGINE
app.set('views',__dirname + '/views/ejs');
app.set('view engine', 'ejs');


app.listen(PORT, () => console.log(`http://localhost:${PORT}`));

app.use("/", views);
app.use("/products", routes);

