import session from 'express-session';

function usuarioLogueado(req, res, next){
    req.session.nombre ?  res.redirect("/welcomeUser") : next()
}

function usuarioSinLoguear(req, res, next){
    req.session.nombre ? res.redirect('/') : next()
}

export {usuarioLogueado, usuarioSinLoguear}