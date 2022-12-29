import knex from "knex";

class mensajesSQL{
    constructor(config){
        this.knex = knex(config)
    }

    createTableSMS(){
        return this.knex.schema.dropTableIfExists("mensajes").finally(() => {
            return this.knex.schema.createTable('mensajes', (table) =>{
                table.increments('id').primary()
                table.string('name')
                table.string('email')
                table.string('sms')
                table.dateTime('date')
            })
        })
    }

    insertSMS(mensajes){
        return this.knex('mensajes').insert(mensajes)
    }

    listSMS() {
        return this.knex("mensajes").select("*");
    }

    disconnect(){
        this.knex.destroy()
    }
}

export default mensajesSQL