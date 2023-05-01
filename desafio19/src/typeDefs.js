const typeDefs = `#graphql
    type Productos{
        _id: ID
        title: String
        description: String
        code: String
        price: Float
        thumbnail: String
    }
    type User{
        _id: ID
        firstName: String
        lastName: String
        email: String
        username: String
        password: String
    }
    type Query {
        QueryTest: String 
        getProducts: [Productos]
        getUsers: [User]
    }

    type Mutation{
        registerUser(firstName: String, lastName: String, email: String, username: String, password: String): User
    }
`
export default typeDefs;