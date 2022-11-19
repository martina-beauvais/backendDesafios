const express = require('express');
const app = express()

const PORT = 8080
let routes = require ('./routes/routes.js')


app.listen(PORT, () => console.log(`http://localhost:${PORT}`))

app.use(express.static("public"));
app.use(express.static('html'))
app.use(express.json());
app.use(express.urlencoded({extended:true}));


app.use("/api/productos", routes);