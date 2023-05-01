import {productsService, userService} from './dao/index.js';
const resolvers = {
    Query: {
        QueryTest: () => {
            return 'Everything is fine.' 
        },
        getProducts: async () => {
            const products = await productsService.getProducts();
            console.log(products)
            return products
        },
        getUsers: async () => {
            const users = await userService.getUsers();
            console.log(users)
            return users
        }

    },
    Mutation: {
        registerUser: async (args) => {
            const user = {
                firstName: args.firstName,
                lastName: args.lastName,
                email: args.email,
                username: args.username,
                password: args.password
            }
            const result = await userService.createUser(user)
            return result;
        }
    }
}
export default resolvers;