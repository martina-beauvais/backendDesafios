export default class productDTO {
    static getTokenProducts = (product) => {
        return {
            title: product.title,
            description: product.description,
            code: product.code,
            category: product.category || 'Uncategorized',
            thumbnail: product.thumbnail || 'No image',
            price: product.price
        };
    };
};