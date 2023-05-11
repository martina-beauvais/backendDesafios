import { cartService, userService } from "../dao/index.js";
import { DateTime } from "luxon";
import { makeID } from "../utils.js";

const insertProductToCart = async(req, res) => {
    const user = req.user;
    const productID = req.params.product;ç
    const cart = await cartService.getCartById(user.cart);
    const exists = cart.products.find(product => product._id.toString() === productID);
    if(exists) return res.status(400).send({status:"error", error: "Game already exists."});
    cart.products.push({_id: productID});
    await cartService.updateCart(cart._id, {products: cart.products});
    res.redirect('/cart');
};

const purchase = async (req, res) => {
    const user = await userService.getUserBy({_id: req.user.id});
    const cart = await cartService.getCartById(user.cart);
    const populatedCart = await cartService.getCartById(user.cart, {populate: true});
    let exists = false;
    cart.products.forEach(product => {
        exists = user.library.some(productInLibrary => productInLibrary._id.toString() === product._id.toString());

    });
    if(exists) return res.status(400).send({status: "error", error: "Product is already in your cart."});
    const newLibrary = [...user.library, ...cart.products];
    await userService.updateUser(user._id,{library: newLibrary});
    await cartService.updateCart(cart._id, {products: []});
    res.send({status: "success", message: "Products added to the library."})
}

export default {
    insertProductToCart,
    purchase
}