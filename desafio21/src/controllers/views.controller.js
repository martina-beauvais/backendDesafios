import { cartService, productService, userService } from "../dao/index.js";

const register = (req, res) => {
    res.render('register');
};

const login = (req, res) => {
    res.render('login');
};

const home = async(req, res) => {
    const products = await productService.getProducts();
    const user = await userService.getUserBy({id: req.user._id});
    console.log(user)
    const cartID = req.user.cart;
    const cart = await cartService.getCartById({cartID});
    products = products.map(product => {
        const existsInCart = cart.products.some(p => p._id.toString() === product._id.toString());
        const existsInLibrary = user.library.some(p => p._id.toString() === product._id.toString());
        return {...products, inCart: existsInCart, inLibrary: existsInLibrary}
    });
    res.render('home',{products})
};

const cart = async(req, res) => {
    const cartID = req.user.cart;
    const cart = await cartService.getCartById({cartID, populate: true});
    const name = req.user.name;
    console.log(cart.products);
    const products = cart.products.map(product => product._id);
    res.render('cart', {products, name});
};


export default {
    register,
    login,
    home, 
    cart
};