import session from 'express-session';

function usuarioLogueado(req, res, next){
    req.session ?  res.redirect("/welcomeUser") : next()
}

function usuarioSinLoguear(req, res, next){
    req.session ? res.redirect('/') : next()
}

export {usuarioLogueado, usuarioSinLoguear}