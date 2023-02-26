import { Router } from "express";
import { fork } from "child_process";

const routerApi = Router();

routerApi.get('/', async (req, res) => {
    const numAleatorio = parseInt(req.query.cantidad) ? parseInt(req.query.cantidad) : 1000;
    console.log(numAleatorio);
    const forked = fork('./src/function/forkRandom.js');
    forked.on('message', message =>{
        res.json(message)
    })
    setTimeout(() => {forked.send(numAleatorio)}, 2000)
})

export default routerApi;
