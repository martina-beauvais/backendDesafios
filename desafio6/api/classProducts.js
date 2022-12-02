const fs = require('fs');

class Products{
    constructor(ruta){
        this.ruta = ruta
    }

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
                item.thumbnail = object.thumbnail
            }
        })
        await fs.promises.writeFile(this.ruta, JSON.stringify(products, null, '\t'));
        return products
    }
}

module.exports = Products