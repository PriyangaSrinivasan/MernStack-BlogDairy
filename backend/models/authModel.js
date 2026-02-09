const mongoose = require("mongoose")

const userSchema = new mongoose.Schema(
    {
        // Name
        name:{
            type:String,
            required:[true,"Name is required"],
            trim:true,
        },
        // Email
        email:{
            type:String, 
            required:[true,"Email is required"],
            unique:true,
            lowercase:true,
            trim:true,
        },
        // password
        password:{
            type:String, 
            minlength:[6,"Password must be at least 6 characters"],
            select:false   // Hide Password in queries by default
        },
        // role
        role:{
              type:String,
              enum:["admin","user"],
              default:"user"
        },
        // Provider - identifies if the user came from Google or normal signup
        provider:{
            type:String,
            enum:["local","google"],
            default:"local",
        },
        // Profile Picture
        picture:{
            type:String,
            default:"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png",
        },
        // Account creation Date

        createdAt:{
            type:Date,
            default:Date.now,
        },
    },
 
    {
        timestamps:true,     // Adds createdAt & updatedAt automatically
    }

);

module.exports = mongoose.model("User",userSchema)