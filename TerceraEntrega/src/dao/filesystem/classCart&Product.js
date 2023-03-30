import fs from 'fs';
import {getTimestamp, newID} from '../../utils/functions.js';

class Container {
    constructor(ruta){
        this.ruta = ruta;
    }

    async saveProduct(product){
        const products = await this.getAllProducts();
        product.id = products.length === 0 ? 0 : product.id = products[products.length - 1].id + 1;
        product.timestamp = getTimestamp()
        try {
            console.log(`El producto se está guardando: \n${JSON.stringify(product)}`);
            products.push(product);
            await fs.promises.writeFile(this.ruta, JSON.stringify(products, null, 2));
            console.log('El producto se ha guardado.');
        } catch (error) {
            console.log('ERROR EN SAVE PRODUCT !');
            console.error(error);
        }
    }

    async getAllProducts(){
        try {
            let products = await fs.promises.readFile(this.ruta, 'utf-8');
            return JSON.parse(products);
        } catch (error) {
            console.log('ERROR EN GET ALL PRODUCTS !');
            console.error(error);
        }
    }

    async getById(id){
        const products = await this.getAllProducts();
        let product = products.find(element => element.id == id);
        return product ? product : null;
    }

    async deleteById(id){
        const products = await this.getAllProducts();
        const product = products.find(element => element.id == id);
        const newProduct = products.filter(element => element != product);
        console.log(newProduct);
        try {
            console.log(`El producto será eliminado: \n${JSON.stringify(product)}`);
            await fs.promises.writeFile(this.ruta, JSON.stringify(newProduct, null, 2))
            console.log('Producto eliminado.')
        } catch (error) {
            console.log('ERROR EN DELETE BY ID !');
            console.error(error);
        }
    }

    async deleteAllProducts(){
        try {
            console.log('Todos los productos serán eliminados.');
            await fs.promises.writeFile(this.ruta, '');
            console.log('Productos eliminados.')
        } catch (error) {
            console.log('ERROR EN DELETE ALL PRODUCTS !');
            console.error(error);
        }
    }

    async saveChanges(object){
        let products = await this.getAllProducts();
        products.map(function(item){
            if(item.id == object.id){
                item.title = object.title, 
                item.price = object.price,
                item.thumbnail = object.thumbnail,
                item.timestamp = object.timestamp
            }
        })
        await fs.promises.writeFile(this.ruta, JSON.stringify(products, null, '\t'));
        return products
    }
    
    async newCart(){
        let products = [];
        let timestamp = getTimestamp();
        let carts = await this.getAllProducts();
        let id = 1; 
        if(carts.length > 0){
            id = newID(carts);
        }
        this.saveCart({id, timestamp, products});
        return {id, timestamp, products};
    }

    async saveCart(cart){
        let carts = await this.getAllProducts();
        carts.push(cart);
        try {
            await fs.promises.writeFile(this.ruta, JSON.stringify(carts, null, 2));
        } catch (error) {
            console.log('ERROR EN SAVE CART !');
        }
    }

    async saveCarts(carts){
        try {
            await fs.promises.writeFile(this.ruta, JSON.stringify(carts, null, 2));
        } catch (error) {
            console.log('ERROR EN SAVE CARTS!');
        }
    }

    async updateCart(cart,id){
        let carts = await this.getAllProducts();
        let index = carts.map(element => element.id == id);
        carts.splice(index, 1);
        console.log(cart);
        carts.push(cart);
        await this.saveCarts(carts);
        return true;
    }

    async addToCart(cartID, product){
        let cart = await this.getById(cartID);
        cart.push(product);
        await this.updateCart(cart);
    }

    async deleteCartProduct(cartID, productID){
        let cart = await this.getById(cartID);
        try {
            if(cart === null){
                throw new Error('Id de carrito no encontrado')
            }
            let newCart = cart.filter(element => element.id =! productID)
            await this.saveCart(newCart)
        } catch (error) {
            console.log('ERROR EN DELETE CART PRODUCT ! ')
            console.log(error)
        }
    }
}

export default Container;