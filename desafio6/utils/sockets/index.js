let {Server : SocketIO} = require('socket.io');
const Productos = require('../../api/classProducts');
const products = new Productos('./resources/productos.json');

class Socket {
    static instancia;
    constructor(http){
        if(Socket.instancia){
            return Socket.instancia
        }
        Socket.instancia = this;
        this.io = new SocketIO(http);
        this.mensajes = []; 
        this.usuarios = [];
        this.productos = [];

    }
    init(){
        try {
            this.io.on('connection', async socket => {
                console.log(`Usuario conectado.`);
                this.io.sockets.emit('init', this.mensajes);

                // ESCUCHAMOS EL MENSAJE DE UN USUARIO 
                // Y LO EMITIMOS A TODOS LOS CONECTADOS
                socket.on('mensaje', data =>{
                    this.mensajes.push(data);
                    this.io.sockets.emit('listenserver', this.mensajes);
                });
                
                socket.on('addUser', data =>{
                    console.log(data);
                    if(this.usuarios.length){
                        let verification_user = false;
                        this.usuarios = this.usuarios.map(usuario => {
                            if(usuario.email == data.email){
                                verification_user = true;
                                return {
                                    id: socket.id,
                                    ...data,
                                    active: true
                                }
                            }else{
                                this.usuarios.push({
                                    id: socket.id,
                                    ...data,
                                    active: true
                                })
                            }
                        })
                        if(!verification_user){
                            this.usuarios.push({
                                id: socket.id,
                                ...data,
                                active: true
                            })
                        }
                    }
                    this.io.sockets.emit('loadUsers', data)
                })
                socket.on('disconnect', () => {
                    console.log('Se desconecto', socket.id);
                    this.usuarios = this.usuarios.map(usuario => {
                        if(usuario.id == socket.id){
                            delete usuario.active
                            return {
                                ...usuario,
                                active: false
                            }
                        }else{
                            return usuario;
                        }
                    })
                    this.io.sockets.emit('loadUsers', this.usuarios)
                })
            })

        } catch (error) {
            console.log('error en sockets')
        }
    }
}



module.exports = Socket;