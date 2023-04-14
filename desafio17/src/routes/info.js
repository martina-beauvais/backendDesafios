import { Router } from "express";

const router = Router()

router.get('/info', async(req, res) => {
    res.json({
        argumentos_de_entrada: process.argv,
        nombre_de_la_plataforma: process.platform,
        nodejs_version: process.version,
        rss: process.memoryUsage().rss,
        path_de_ejecucion: process.execPath,
        processID: process.pid,
        carpeta_del_proyecto: process.cwd(),
    })
})
export default router; 