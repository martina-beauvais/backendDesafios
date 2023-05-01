import cartsSchema from '../dao/mongoDB/cartsSchema.js';
import productsSchema from '../dao/mongoDB/productsSchema.js';
import { cartsService } from '../dao/index.js';


//get all the carts
const getCarts = async (req, res) => {
    const carrito = await cartsService.getCarts();
    res.send({status: "success", payload: carrito})
}

//add product in cart
const addToCart = async (req, res) => {
    const {title, price } = req.body;
    const estaEnProducts = await productsSchema.findOne({ title });
    const noEstaVacio = title !== "" && price !== "";
    const estaEnElCarrito = await cartsSchema.findOne({ title });

    if (!estaEnProducts) {
        res.status(400).json({
            mensaje: "Este producto no se encuentra en nuestra base de datos",
        });

    } else if (noEstaVacio && !estaEnElCarrito) {
        const newProductInCart = new cartsSchema({ title, price, quantify: 1 });

        await productsSchema.findByIdAndUpdate(
            estaEnProducts?._id,
            { inCart: true, title, price },
            { new: true }
        )
        .then((product) => {
            newProductInCart.save();
            res.json({
                mensaje: `El producto fue agregado al carrito`,
                product,
            });
        })
        .catch((error) => console.error(error));

    } else if (estaEnElCarrito) {
        res.status(400).json({
            mensaje: "El producto ya esta en el carrito",
        });
    }
}


//get a cart by id 
const getCartById = async (req, res) => {
    const id = req.params.id;
    const getCart = await cartsSchema.findOne({_id: id});
    res.render({getCart})

}

//insert a new cart
const insertCart = (req, res) => {
    const data = req.body;
    cartsSchema.create(data, (err, cart) =>{
        res.send({cart: cart})
    })
}

//update an old cart by id
const updateCartById = (req, res) => {
    const id = req.params.id;
    const body = req.body;
    cartsSchema.updateOne(
        {_id: id},
        body,
        (err, cart) =>{
            res.send({cart: cart})
        }
    )
}

//delete a cart by id 
const deleteCartById = (req, res) => {
    const id = req.params.id;
    cartsSchema.deleteOne(
        {_id: id},
        (err, cart) =>{
            res.send({cart: cart})
        }
    )
}

export default {
    getCarts,
    addToCart,
    getCartById,
    insertCart,
    deleteCartById,
    updateCartById
}