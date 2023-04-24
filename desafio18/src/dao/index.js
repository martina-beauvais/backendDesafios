/*let key = 1;
//let persistencia;

//switch (key) {
//    case "MONGO": 
}*/

import cartsDAO from "./carritoDAO.js";
import productsDAO from "./productsDAO.js";
import UserDAO from "./userDAO.js";

export const userService = new UserDAO();
export const productsService = new productsDAO();
export const cartsService = new cartsDAO();