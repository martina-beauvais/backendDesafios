

const index = (req, res) => {
    res.render('index', { layout: false })
}

const home = (req, res) => {
    res.render('home', {layout: false})
}

const perfilUser = (req, res) => {
    res.render('perfil-de-usuario', {user:req.user})
}

const loginError = (req, res) => {
    res.render('loginError', {layout: false})
}

const register = (req, res) => {
    res.render('register', { layout: false });
}

const login = (req, res) => {
    res.render('login',{ layout: false });
}

const logOut = (req, res) => {
    const user = req.user;
    res.render('logout', {user})
}

export default {
    index, 
    home,
    perfilUser, 
    loginError, 
    register, 
    login,
    logOut
}