 const mongoose = require("mongoose")

 const likeSchema = new mongoose.Schema(
    {
          blog:{
                  type:mongoose.Schema.Types.ObjectId,
                  ref:"Blog",
                  required:true,
              },
        
        user:{
                 type:mongoose.Schema.Types.ObjectId,
                 ref:"User",
                 required:true,
            },
    },
    {
        timestamps:true
    }
 )
// ✅ Ensure one like per user per blog (avoid duplicates)
likeSchema.index ({blog:1,user:1},{unique:true});

 module.exports = mongoose.model("Like",likeSchema)