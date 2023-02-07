import express from "express";
import { generateProduct } from "../Faker/prod_utils.js";
import Products from '../resources/products.json' assert { type: "json" };
import Messages from '../resources/messages.json' assert { type: "json" };
import normalizedData from '../Normalizr/mensajes.js'
import { postChat } from "../Normalizr/mensajes.js";

const router = express.Router();

router.get('/', (req, res) => {
    res.render('home', {})
})

router.get('/products', (req, res) => {
    let products = Products;
    res.render('products', {products})
})

router.get('/products-test', (req, res) => {
    const products = [];
    for(let i=0; i<5; i++){
        products.push(generateProduct())
    };
    res.send({status: 'success', payload: products})
})

router.get('/messages', (req, res) => {
    const mensajes = normalizedData.Entity('post')

    res.render('messages', {
        data: mensajes
    })
})

export default router; 