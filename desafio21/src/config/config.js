export default {
    app:{
        ADMIN_USER: process.env.ADMIN_EMAIL,
        ADMIN_PWD: process.env.ADMIN_PWD,
        PERSISTENCE: process.env.PERSISTENCE
    },
    mongo: {
        URL: process.env.MONGO_URL,
    },
    jwt: {
        COOKIE:process.env.JWT_COOKIE,
        SECRET:process.env.JWT_SECRET
    }
};