import cartDAO from "./mongoDB/cartDAO.js";
import productDAO from "./mongoDB/productDAO.js";
import userDAO from "./mongoDB/userDAO.js";

export const cartService = new cartDAO();
export const productService = new productDAO();
export const userService = new userDAO();