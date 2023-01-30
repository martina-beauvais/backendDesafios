import mongoose from "mongoose";

const mongoDB = 'mongodb+srv://martinabeauvais:Necesitas11@coderclustercomision381.asqu6kh.mongodb.net/viciouscoffee';
mongoose.connect(mongoDB)

const connect = () => {

    mongoose.connect(
        mongoDB,
        {   keepAlive: true,
            useNewUrlParser: true,
            useUnifiedTopology: true
        },
        (err) => {
            if (err) {
                console.log('DB: ERROR !!');
            } else {
                console.log('Conexion correcta!!')
            }
        }
    )
}

connect()

export default connect 