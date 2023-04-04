const esAdministrador = false

function noEsAdministrador (ruta, metodo) {
    const error = {
        error: -1,
    }
    if (ruta && metodo) {
        error.descripcion = `Ruta '${ruta}' método '${metodo}' no autorizada.`
    } else {
        error.descripcion = 'No está autorizado.'
    }
    return error
}
function administradores(req, res, next) {
    if (!esAdministrador) {
        res.json(noEsAdministrador())
    } else {
        next()
    }
}

export {noEsAdministrador, administradores}