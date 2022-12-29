const knexLib = require("knex");
const fs = require('fs');


class ContainerSQL{
    constructor(config, ruta, table){
        this.knex = knexLib(config);
        this.ruta = ruta;
        this.table = table
    }

    // PRODUCTOS

    async saveProduct(product){
        const products = await this.getAllProducts();
        product.id = products.length === 0 ? 0 : product.id = products[products.length - 1].id + 1;
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
            const products = await this.knex(this.table).select('*')
            return JSON.parse(products);
        } catch (error) {
            console.log('ERROR EN GET ALL PRODUCTS !');
            console.error(error);
        }
    }

    async getById(id){
        try {
            const product = await this.knex(this.table).select('*').where('id', id)
            this.disconnect()
            return product
        } catch (error) {
            return null
        }
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
                item.thumbnail = object.thumbnail
            }
        })
        await fs.promises.writeFile(this.ruta, JSON.stringify(products, null, '\t'));
        return products
    }

    //MENSAJES

    async saveMessage(message){
        const messages = await this.getAllMessages();
        messages.push(message);
        try {
            await fs.promises.writeFile(this.ruta, JSON.stringify(messages, null, 2));
            return console.log('Mensaje guardado.');
        } catch (error) {
            console.log('ERROR EN SAVE MESSAGE !');
            return console.error(error);
        }
    }

    async getAllMessages(){
        try {
            let messages = await fs.promises.readFile(this.ruta, 'utf-8');
            return JSON.parse(messages);
        } catch (error) {
            console.log('ERROR EN GET ALL MESSAGES !');
            console.error(error);
            return []
        }
        
    }
}

module.exports = ContainerSQL