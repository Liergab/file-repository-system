import mongoose from "mongoose";
import env from '../utils/EnvValidation';

const db = async() => {
    try {
        const dbconnect = await mongoose.connect(env.MONGODB_CONNECTION_STRING )
            console.log(`Connected : ${dbconnect.connection.host}, ${dbconnect.connection.name}`)
    } catch (error) {
        
        if(error instanceof Error){
            console.error(`error: ${error.message}`)
            process.exit(1)
        } 
    }
};

export default db