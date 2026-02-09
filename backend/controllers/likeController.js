const Like = require("../models/likeModel");
const Blog = require("../models/blogModel");

const toggleLike = async (req, res) => {
  try {
    const { blogId } = req.params;
    const userId = req.user._id;

    // Check if blog exists
    const blog = await Blog.findById(blogId);
    if (!blog)
      return res.status(404).json({ message: "Blog not found" });

    // Check if already liked
    const existingLike = await Like.findOne({ blog: blogId, user: userId });

    if (existingLike) {
      await existingLike.deleteOne();
    } else {
      await Like.create({ blog: blogId, user: userId });
    }

    // ⛔ IMPORTANT: return full updated blog object
    const updatedBlog = await Blog.findById(blogId)
      .populate("author", "name email")
     .populate({
          path: "comments",
          populate: { path: "user", select: "name email _id" },
          options: { sort: { createdAt: -1 } } 
        })

      .populate({
        path: "likes",
        populate: { path: "user", select: "name email _id" }
      });

    return res.json(updatedBlog);

  } catch (error) {
    console.error("Toggle Like Error:", error);
    res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

module.exports = { toggleLike };
