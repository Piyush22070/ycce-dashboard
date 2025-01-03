import mongoose from "mongoose";
import {DB_NAME} from '../utils/constant.js'
const connectDB = async ()=>{
    if (mongoose.connection.readyState >= 1) {
        // If a connection already exists, reuse it
        return;
      }
    console.log('Connecting to MongoDB...');
    try{
       const db = await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
       console.log(`\n MongoDB Connected !!! Host Name : ${db.connection.host}`)  
    }
    catch(error){
        console.log(error)
        process.exit(1)
    }
}
export default connectDB 
