import userDAO from "../../models/userSchema.js";

export const getUsers = async (req, res) => {
    const user = await userDAO.find()
    res.render('perfil-de-usuario',{user})
}