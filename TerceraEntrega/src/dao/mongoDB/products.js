import productsSchema from '../../models/productsSchema.js' 

//get all the products
export const getProducts = async (req, res) => {
    const productos = await productsSchema.find().lean()
    res.render('products',{productos})
}

//get a product by id 
export const getProductById = async (req, res) => {
    const id = req.params.id;
    const productoById = await productsSchema.findOne({_id: id})
    res.send({data: productoById})
}

//insert a new product
export const insertProduct = (req, res) => {
    const data = req.body;
    productsSchema.create(data, (err, docs) =>{
        res.send({data: docs})
    })
}

//update an old product by id
export const updateById = (req, res) => {
    const id = req.params.id;
    const body = req.body;
    productsSchema.updateOne(
        {_id: id},
        body,
        (err, docs) =>{
            res.send({data: docs})
        }
    )
}

//delete a product by id 
export const deleteById = (req, res) => {
    const id = req.params.id;
    productsSchema.deleteOne(
        {_id: id},
        (err, docs) =>{
            res.send({data: docs})
        }
    )
}
