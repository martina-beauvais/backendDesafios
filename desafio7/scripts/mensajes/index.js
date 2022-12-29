import mensajesSQL from "./mensajesSQL.js";
import optionsSql from '../../options/configSQLITE.js';

const mensajes = new mensajesSQL(optionsSql)

try {
    await mensajes.createTableSMS()
    console.log('Tabla de mensajes creada.')

    const messages = [
        {"name": "mar", "email": "gdfgdf@gmail.com", "sms": "hi"},
        {"name": "azul", "email": "gdfgdf@gmail.com", "sms": "hi"},
        {"name": "martina", "email": "marbeauvais17@gmail.com", "sms": "hola"},
        {"name": "azul", "email": "gdfgdf@gmail.com", "sms": "oooo"}
    ]

    await mensajes.insertSMS(messages)
    console.log('Mensajes guardados.')

    const ultimoMensaje = await mensajes.listSMS()
    console.log('Listo.')
    console.table(ultimoMensaje)
} catch (error) {
    console.log(error)
} finally {
    mensajes.disconnect()
}
