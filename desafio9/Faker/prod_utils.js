import { faker } from "@faker-js/faker";

export const generateProduct = () => {
    const product = {
        id : faker.database.mongodbObjectId(),
        title : faker.commerce.productName(),
        description : faker.commerce.productDescription(),
        price: faker.commerce.price(),
        thumbnail: faker.image.imageUrl(),
        stock: faker.random.numeric(5)
    }
    return product
}