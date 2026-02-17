// // config/db.js

const mongoose = require("mongoose")
const dotenv = require("dotenv")
 
dotenv.config() //Load .env file

const connectDB = async () =>{
    try{
         console.log("Mongodb URI Loaded:", process.env.MONGODB_URI);
        await mongoose.connect(process.env.MONGODB_URI)     // Connect to MongoDB
        console.log("✅ MongoDB Connected Sucessfully");
        
    }catch(error){
       console.error("❌ MongoDB Connection Failed:", error.message)
       process.exit(1)  // Stop the Server if Connection Fails
    }
}
module.exports = connectDB;



