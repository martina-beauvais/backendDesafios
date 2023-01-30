import productsSchema from '../../models/productsSchema.js' 

//get all the products
export const getProducts = (req, res) => {
    productsSchema.find({}, (err, docs) => {
        res.send({ docs })
    })
}

//get a product by id 
export const getProductById = (req, res) => {
    const id = req.params.id;
    productsSchema.findOne({_id: id}, (err, docs) => {
        res.send({
            data: docs
        })
    })
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
