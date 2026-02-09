const mongoose = require("mongoose");
const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    image: { type: String },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },   // ✅ Include virtuals when converting to JSON
    toObject: { virtuals: true }, // ✅ Include virtuals when converting to Object
  }
);

blogSchema.virtual("comments", {
  ref: "Comment",
  localField: "_id",
  foreignField: "blog",
  justOne: false,
});

blogSchema.virtual("likes", {
  ref: "Like",
  localField: "_id",
  foreignField: "blog",
  justOne: false,
});

module.exports = mongoose.model("Blog", blogSchema);
