// --- Importo las dependencias --- //
import mongoose from "mongoose";

mongoose.set('strictQuery', true);

// DEFINO LAS CONSTANTES DE MENSAJES Y PRODUCTOS

    // --- MENSAJES --- //
        const mensajes = [
            {date: "14-7-2023", mail: "lavenderhaze@gmail.com", sms: "I feel the lavender haze creeping up on me."},
            {date: "14-7-2023", mail: "maroon@gmail.com", sms: "So scarlet it was maroon."},
            {date: "14-7-2023", mail: "antihero@hotmail.com", sms: "Midnights become my afternoons."},
            {date: "14-7-2023", mail: "karma@hotmail.com", sms: "Spider-boy, king of thieves."},
            {date: "14-7-2023", mail: "thegreatwar@gmail.com", sms: "All throughout the Great War."},
            {date: "14-7-2023", mail: "mastermind@gmail.com", sms: "What if I told you i'm a mastermind?"},
            {date: "14-7-2023", mail: "midnightrain@hotmail.com", sms: "He was sunshine, I was midnight rain."},
            {date: "14-7-2023", mail: "glitch@hotmail.com", sms: "I think there's been a glitch."},
            {date: "14-7-2023", mail: "sweetnothing@gmail.com", sms: "I spy with my little tired eye."},
            {date: "14-7-2023", mail: "bejeweled@gmail.com", sms: "Best believe I'm still bejeweled."},
        ]

        const mensajesSchema = new mongoose.Schema({
            date: {type: String, required: true},
            mail: {type: String, required: true},
            sms: {type: String, required: true}
        })

        const mensajesDAO = mongoose.model('mensajes', mensajesSchema)

    // --- PRODUCTOS --- //
        const productos = [
            {   
                "title": "Caramel Macchiato",
                "description": "El Caramel Macchiato está hecho de una increíble mezcla de expresso con leche, acompañado por la dulzura del caramelo.",
                "code": "VC-CM-M",
                "thumbnail": "https://www.starbucksathome.com/ar/sites/default/files/styles/nutrition_instruction_image/public/2021-06/CaramelMacchiato_LongShadow%20%281%29_1.png?itok=DR7inqty",
                "price": 250,
                "stock": 3500
            },
            {
                "title": "Iced Latte",
                "description": "Iced Latte está hecho con expresso, leche y un toque de dulzura opcional.",
                "code": "VC-IL-M",
                "thumbnail": "https://www.starbucksathome.com/ar/sites/default/files/2021-03/2-IcedLatte_LongShadow_Cream_1.png",
                "price": 370,
                "stock": 1400
            },
            {
                "title": "Espresso",
                "description": "Café negro.",
                "code": "VC-EX-C",
                "thumbnail": "https://www.starbucksathome.com/ar/sites/default/files/styles/nutrition_instruction_image/public/2021-06/EspressoIntro_LongShadow.png?itok=D5fxyU4m",
                "price": 170,
                "stock": 4500
            },
            {
                "title": "Vanilla Latte",
                "description": "Bebida a base de café expreso, leche al vapor y sirope de vainilla.",
                "code": "VC-VL-M",
                "thumbnail": "https://www.starbucksathome.com/ca/sites/default/files/2021-03/Vanilla%20Latte_LongShadow_Cream.png",
                "price": 350,
                "stock": 4600
            },
            {
                "title": "Latte macchiato",
                "description": "Bebida preparada con leche y café expreso.",
                "code": "VC-LM-M",
                "thumbnail": "https://www.starbucksathome.com/es/sites/default/files/2021-06/10032021_LATTE_MACCHIATO_LS-min.png",
                "price": 350,
                "stock": 4500
            },
            {
                "title": "London Fog",
                "description": "Bebida caliente a base de té Earl Grey, leche al vapor y sirope de vainilla.",
                "code": "VC-LF-C",
                "thumbnail": "https://barbados.latinosmarketing.com/wp-content/uploads/2021/10/LondonFogTeaLatte-onWhite_coreLib_sRGB.png",
                "price": 4000,
                "stock": 8540
            },
            {
                "title": "Strawberry Lemonade",
                "description": "Frutillas frescas con agua, agave y una generosa cantidad de zumo de limón.",
                "code": "VC-SL-M",
                "thumbnail": "https://www.starbucks.com.au/_files/refreshers/beverage-images4.png",
                "price": 350,
                "stock": 1300
            },
            {
                "title": "Irish Cream Cold Brew",
                "description": "Café Cold Brew, sirope simple de crema irlandesa, crema fría de vainilla dulce, hielo, y se corona con una espolvoreada de cacao en polvo.",
                "code": "VC-ICCB-G",
                "thumbnail": "https://stories.starbucks.com/uploads/sites/9/2019/12/IrishCreamHotAmericano-1024x1024.png",
                "price": 350,
                "stock": 69000
            },
            {
                "title": "Red Velvet Frappe",
                "description": "Salsa con sabor a Red Velvet combinada con leche y mezclada con hielo. Cubierto con nata montada y galletas de Red Velvet.",
                "code": "VC-RVF-M",
                "thumbnail": "https://www.starbucks.com.au/_files/christmas-transparent-23/beverage-images15.png",
                "price": 400,
                "stock": 75650
            },
            {
                "title": "Cinnamon Roll",
                "description": "Consiste en una lámina enrollada de masa leudada con levadura sobre la que se espolvorea una mezcla de canela y azúcar sobre una fina capa de mantequilla.",
                "code": "VC-CR-F",
                "thumbnail": "https://www.starbucks.com.au/imagecache/bestfit/620x634/_files/product-images/bakery/cinnamonscroll-shadow.png",
                "price": 260,
                "stock": 87000
            },
        ]

        // -- Defino el esquema de los datos y del modelo para interactuar con la base de datos.
        const productosSchema = new mongoose.Schema({
            title: {type: String, required: true},
            description: {type: String, required: true},
            code: {type: String, required: true},
            thumbnail: {type: String, required: true},
            price: {type: Number, required: true},
            stock: {type: Number, required: true}
        })

        const productosDAO = mongoose.model('productos', productosSchema)

// CONECTO A LA BASE DE DATOS : ECOMMERCE

    await mongoose.connect('mongodb://127.0.0.1:27017/ecommerce', {
        serverSelectionTimeoutMS: 5000,
    })
    console.log('BASE DE DATOS CONECTADA !')

// ESCRITURA A LA BASE DE DATOS (MENSAJES)
    const insercionesMens = []

    for (const mensaje of mensajes){
        insercionesMens.push(mensajesDAO.create(mensaje))
    }

    const resultMens = await Promise.allSettled(insercionesMens)
    const rejectedMens = resultMens.filter(r => r.status == 'rejected')
    if (rejectedMens.length > 0){
        console.log('ERROR(ES): ' + rejectedMens.length)
    } else {
        console.log("TODO ESTÁ BIEN !")
    }

// ESCRITURA A LA BASE DE DATOS (PRODUCTOS)
    const insercionesProd = []

    for (const producto of productos){
        insercionesProd.push(productosDAO.create(producto))
    }

    const resultProd = await Promise.allSettled(insercionesProd)
    const rejectedProd = resultProd.filter(r => r.status == 'rejected')
    if (rejectedProd.length > 0){
        console.log('Cantidad de fallos: ' + rejectedProd.length)
    } else {
        console.log("Todo OK!")
    }

// -----------------------------------------------------------------
    // MUESTRO TODOS LOS DOCUMENTOS DE AMBAS COLECCIONES //

    mensajes.find(function(err, mensajes){
        if (err) return console.error(err);
        console.log(mensajes);
    })

    productos.find(function(err, productos){
        if (err) return console.error(err);
        console.log(productos);
    })

// -----------------------------------------------------------------
    // MUESTRO LA CANTIDAD DE DOCUMENTOS DE CADA COLECCIÓN //

    mensajesDAO.countDocuments(function(err, mensajes){
        if (err) return console.error(err);
        console.log(mensajes);
    })

    productosDAO.countDocuments(function(err, productos){
        if (err) return console.error(err);
        console.log(productos);
    })

// -----------------------------------------------------------------
//                             CRUD 
// -----------------------------------------------------------------
    // a) 
        let nuevoMensaje = new mensajesDAO(
                {date: "14-7-2023", 
                mail: "delicate@gmail.com", 
                sms: "My reputation's never been worse."}
            )
        nuevoMensaje.save(function(err) {
            if (err) return console.error(err);
        });

        let nuevoProducto = new productosDAO({   
            "title": "Caramel Frappe",
            "description": "El Caramel Frappe está hecho de una increíble mezcla de expresso con leche, acompañado por la dulzura del caramelo.",
            "code": "VC-CF-M",
            "thumbnail": "https://www.starbucksathome.com/ar/sites/default/files/styles/nutrition_instruction_image/public/2021-06/CaramelMacchiato_LongShadow%20%281%29_1.png?itok=DR7inqty",
            "price": 650,
            "stock": 4500
            })
            nuevoProducto.save(function(err) {
            if (err) return console.error(err);
        });

        const result = await Promise.allSettled(inserciones)
        const rejected = result.filter(r => r.status == 'rejected')
        if (rejected.length > 0){
            console.log('Cantidad de fallos: ' + rejected.length)
        } else {
            console.log("Todo OK!")
        }
    
    // b) Listar los productos con precio menor a 1000 pesos.
        productosDAO.find({"price" : {$lt : 1000}}, function(err, productos) {
            if (err) return console.error(err);
            console.log(productos);
        })
        // Listar los productos con precio entre los 1000 a 3000 pesos
        productosDAO.find({"price" : {$gte : 1000 , $lte : 3000}}, function(err, productos) {
            if (err) return console.error(err);
            console.log(productos)
        })
        // Listar los productos con precio mayor a 3000 pesos
        productosDAO.find({"price" : {$gt : 3000}}, function(err, productos) {
            if (err) return console.error(err);
            console.log(productos)
        })

        // Realizar una consulta que traiga sólo el nombre del tercer producto más barato
        productosDAO.find({},{_id:0,"title":1}).sort({"price":1}).limit(1).skip(2)
        
    // c)
        productosDAO.updateMany({}, {$set :{"stock" : 100}}, function(err, productos){
            if(err) return console.error(err);
            console.log(productos)
        })
        productosDAO.find(function(err, productos){
            if (err) return console.error(err);
            console.log(productos);
        })

    // d)
        productosDAO.updateMany({price: {$gt: 4000}}, {$set :{stock : 0}}, function(err, productos){
            if (err) return console.error(err);
            console.log(productos)
        })

    // e) 
        productosDAO.deleteMany({price: {$lt: 1000}}, function(err, productos){
            if(err) return console.error(err); 
            console.log(productos);
        })

//  ----------------------------------------------------------------------------------------
    // CREO UN USUARIO QUE SÓLO SEA CAPAZ DE LEER LA BASE DE DATOS Y NO MODIFICAR LA INFORMACIÓN //    
        const usuarios = [
            {user: "pepe", pwd: "asd456", roles: [{role: 'read', db: 'productos'}, {role: 'read', db: 'mensajes'}]}        
        ]

        const usuariosSchema = new mongoose.Schema({
            user: {type: String, required: true},
            pwd: {type: String, required: true},
            roles: [{
                role: {type: String},
                role: {type: String}
            }]
        })

        const usuariosDAO = mongoose.model('usuarios', usuariosSchema)

    // CONECTO CON LA BASE DE DATOS (ADMIN)    
    await mongoose.connect('mongodb://127.0.0.1:27017/admin', {
        serverSelectionTimeoutMS: 5000,
    })
    console.log('Base de datos conectada')

    const insercionesUsua = []

    for (const usuario of usuarios){
        insercionesUsua.push(usuariosDAO.create(usuario))
    }

    const resultUsua = await Promise.allSettled(insercionesUsua)
    const rejectedUsua = resultUsua.filter(r => r.status == 'rejected')
    if (rejectedUsua.length > 0){
        console.log('Cantidad de fallos: ' + rejectedUsua.length)
    } else {
        console.log("Todo OK!")
    }

// CIERRO LA CONEXIÓN
await mongoose.disconnect()