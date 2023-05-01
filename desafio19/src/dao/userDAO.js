import userSchema from "./mongoDB/userSchema.js";

//export const getUsers = async (req, res) => {
//    const user = await userDAO.find()
//    res.render('perfil-de-usuario',{user})
//}

export default class UserDAO {
    getUsers = (params) => {
        return userSchema.find(params).lean();
    };

    getUserBy = (params) => {
        return userSchema.findOne(params).lean();
    };

    createUser = (user) => {
        return userSchema.create(user);
    };

    drop = () => {
        return userSchema.collection.drop();
    };
}