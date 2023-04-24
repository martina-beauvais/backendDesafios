export default class product {
    static getInsertDTO = (product) => {
        return {
            title: product.title ||'Sin título',
            description: product.description,
            code: product.code,
            price: product.price,
            stock: product.stock,
            thumbnail: product.thumbnail || 'url'
        }
    } 
    static getCardProductDTO = (product) => {
        return{
            title: product.title,
            description: product.description,
            code: product.code,
            price: product.price,
            active: product.stock>0,
            thumbnail: product.thumbnail
        }
    } 
}