// // // config/db.js

// const mongoose = require("mongoose")
// const dotenv = require("dotenv")
 
// dotenv.config() //Load .env file

// const connectDB = async () =>{
//     try{
//          console.log("Mongodb URI Loaded:", process.env.MONGODB_URI);
//         await mongoose.connect(process.env.MONGODB_URI)     // Connect to MongoDB
//         console.log("✅ MongoDB Connected Sucessfully");
        
//     }catch(error){
//        console.error("❌ MongoDB Connection Failed:", error.message)
//        process.exit(1)  // Stop the Server if Connection Fails
//     }
// }
// module.exports = connectDB;

// config/db.js

const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config(); // Load .env file

const connectDB = async () => {
  try {
    console.log("Mongodb URI Loaded:", process.env.MONGODB_URI);

    await mongoose.connect(process.env.MONGODB_URI, {
      family: 4,                   // 🔥 FORCE IPv4 (very important)
      serverSelectionTimeoutMS: 30000,
      socketTimeoutMS: 45000,
    });

    console.log("✅ MongoDB Connected Successfully");
  } catch (error) {
    console.error("❌ MongoDB Connection Failed:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
