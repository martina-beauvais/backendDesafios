const fs = require('fs');

class Messages{
    constructor(ruta){
        this.ruta = ruta
    }

    async saveMessage(message){
        const messages = await this.getAllMessages();
        messages.push(message);
        try {
            await fs.promises.writeFile(this.ruta, JSON.stringify(messages, null, 2));
            return console.log('Mensaje guardado.');
        } catch (error) {
            console.log('ERROR EN SAVE MESSAGE !');
            return console.error(error);
        }
    }

    async getAllMessages(){
        try {
            let messages = await fs.promises.readFile(this.ruta, 'utf-8');
            return JSON.parse(messages);
        } catch (error) {
            console.log('ERROR EN GET ALL MESSAGES !');
            console.error(error);
            return []
        }
        
    }
}

module.exports = Messages