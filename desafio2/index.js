const fs = require('fs')

class Contenedor { 
    constructor(ruta){
        this.ruta = ruta
    }

    async save(objeto){
        const productos = await this.getAll()
        objeto.id = productos.length === 0 ? 0 : objeto.id = productos[productos.length - 1].id + 1
        productos.push(objeto)
        try {
            console.log(`Se está guardando este prodcuto: \n${JSON.stringify(objeto)}`)
            await fs.promises.writeFile(this.ruta, JSON.stringify(productos, null, 2))
            console.log('Producto guardado.')
        } catch (error) {
            console.error('ERROR !')
            console.error(error)
        }
    }

    async getById(id){
        const productos = await this.getAll()
        let producto = productos.find(element => element.id == id)
        return producto ? producto : null
    }

    async getAll(){
        try {
            let productos = await fs.promises.readFile(this.ruta, 'utf-8')
            return JSON.parse(productos)
        } catch (error) {
            console.error('ERROR EN MOSTRAR TODOS LOS PRODUCTOS !')
            console.error(error)
            return []
        }
    }

    async deleteById(id){
        const productos = await this.getAll()
        const producto = productos.find(element => element.id == id)
        const nuevoProducto = productos.filter(element => element != producto)
        console.log(nuevoProducto)
        try {
            console.log(`Este producto será eliminado: \n${JSON.stringify(producto)}`)
            await fs.promises.writeFile(this.ruta, JSON.stringify(nuevoProducto, null, 2))
            console.log(`Eliminado exitosamente.`)
        } catch (error) {
            console.error('ERROR EN ELIMINAR !')
            console.error(error)
        }
    }

    async deleteAll(){
        try {
            console.log('Todos los productos serán eliminados ...')
            await fs.promises.writeFile(this.ruta, "")
            console.log('Productos eliminados exitosamente.')
        } catch (error) {
            console.error('ERROR EN ELIMINAR TODO !.')
            console.error(error)
        }
    }
    
}


// --- Sector de prueba con cada método creado --- 

async function pruebas(){
    const productos = new Contenedor('productos.json')

    // --- PRUEBAS DE SAVE() [3 productos] ---
    let producto1 = {"id": 1, "title":"Iced Coffee", "price": 450, "img":"./img/vicious takeaway cup v1.png"}
    await productos.save(producto1)

    let producto2 = {"title": "Latte", "price": 250, "img": "./img/vicious takeaway cup v1.png"}
    await productos.save(producto2)

    let producto3 = {"title": "Macchiato", "price": 250, "img": "./img/vicious takeaway cup v1.png"}
    await productos.save(producto3)

    // --- PRUEBAS DE GETBYID() [con y sin id existente] --- 
       // - ID EXISTENTE - 
    let buscarID = 2
    console.log(`ID de producto a mostrar: ${buscarID}`)
    let productoById = await productos.getById(buscarID)
    console.log(productoById)
        // - ID INEXISTENTE - 
    let buscarID2 = 5
    console.log(`ID de producto a mostrar: ${buscarID2}`)
    let productoById2 = await productos.getById(buscarID2)
    console.log(productoById2)

    // --- PRUEBA DE GETALL() ---
    console.log('Todos los productos: ')
    let allProductos = await productos.getAll()
    console.log(allProductos)

    // --- PRUEBA DE DELETEBYID() ---
    console.log('Eliminar producto mediante ID')
    let productoIdToDelete = 1
    await productos.deleteById(productoIdToDelete)
    
    // --- PRUEBA DE DELETEALL() ---
    await productos.deleteAll()
}

pruebas()