import chai from "chai";
import supertest from "supertest";

const expect = chai.expect;
const requester = supertest('http://localhost:8080');

describe('Pruebas de integración con el servidor completo', () => {
    it('El endpoint POST api/sessions/register debe registrar correctamente a un usuario', async function() {
        const testUser = {
            firstName: "SuperTestUser",
            lastName: "User",
            email: "SuperTestUser@gmail.com",
            username: "SuperTestUser",
            password: "1233"
        }
        const response = await requester.post('/api/sessions/register').send(testUser)
        //.field('firstName', testUser.firstName)
        //.field('lastName', testUser.lastName)
        //.field('email', testUser.email)
        //.field('password', testUser.password)
        //.field('username', testUser.username)
        //.attach('avatar', './test/avatar-1-mujer.png')

        const {_body} = response;
        console.log(_body);    
    })

    it('El endpoint GET debe traer los productos con api/productos', async function() {
        const response = await requester.get('/api/productos')
        expect(response.status).to.be.ok;
        const {_body} = response;
        console.log(_body);
        //expect(_body.payload).to.be.ok;
    })
})