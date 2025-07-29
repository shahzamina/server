
const mongoose = require('mongoose')
const dotenv=require('dotenv')
dotenv.config({path:'./.env'})
 const connectDb = async() => {

    try{
        const conn = await mongoose.connect(process.env.MONGO_URI);
            console.log(`MongoDb connected : ${conn.connection.host}`)
        
    }
    catch(error){
            console.log("error connecting",error);
            process.exit(1)
    }
}

module.exports=connectDb;