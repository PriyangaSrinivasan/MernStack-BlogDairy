 const mongoose = require("mongoose")

const commentSchema = new mongoose.Schema(
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

     text:{
            type:String,
            required:true,
            trim:true,
              minlength: [1, "Comment cannot be empty"],
  maxlength: [500, "Comment cannot exceed 500 characters"],
          },
        },

    {
        timestamps:true
    }
);

module.exports = mongoose.model("Comment",commentSchema)