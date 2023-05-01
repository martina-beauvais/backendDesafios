import UserDAO from '../src/dao/userDAO.js';
import mongoose from 'mongoose';

import {strict as assert} from 'assert';

mongoose.connect("mongodb+srv://martinabeauvais:Necesitas11@coderclustercomision381.asqu6kh.mongodb.net/viciouscoffeeTesting?retryWrites=true&w=majority");
const usersService = new UserDAO();

describe('Tests para obtener los users de DAO',() => {
    describe('Prueba de lectura', () =>{
        it('Obtengo los datos', async function() {
            const result = await usersService.getUsers()
            assert.ok(result);
            assert.strictEqual(Array.isArray(result), true)
        });
    });
    describe('Prueba de escritura', () => {
        before(async function(){
            await usersService.drop();
        });
        it('El DAO debe poder insertar un usuario correctamente', async function(){
            const mockUser = {
                firstName: "TestUser",
                lastName: "User",
                direccion: "9",
                numero: "+549112222222",
                edad: "25",
                email: "newUser17@gmail.com",
                password: "1233",
                username: "UserTest"
            }
            const result = await usersService.createUser(mockUser);
            assert.ok(result._id)
        });
    });
});