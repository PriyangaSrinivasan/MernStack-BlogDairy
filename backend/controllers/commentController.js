
const Comment = require("../models/commentModel")
const Blog = require("../models/blogModel")

// Add Comment
const addComment = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.blogId);
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    await Comment.create({
      blog: blog._id,
      user: req.user._id,
      text: req.body.text,
    });

    const updatedBlog = await Blog.findById(blog._id)
      .populate("author", "name email")
      .populate({
        path: "comments",
        populate: { path: "user", select: "name _id" },
        options: { sort: { createdAt: -1 } },
      })
      .populate({
        path: "likes",                          // ✅ fixed
        populate: { path: "user", select: "name email _id" }
      });

    res.status(201).json(updatedBlog);
  } catch (error) {
    console.error("Add Comment Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Edit Comment
const editComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const { text } = req.body;

    const comment = await Comment.findById(commentId);
    if (!comment) return res.status(404).json({ message: "Comment Not Found" });

    const userId = (req.user._id || req.user.id).toString(); // ✅ fixed
    if (req.user.role !== "admin" && comment.user.toString() !== userId) {
      return res.status(403).json({ message: "Not authorized to edit this comment" });
    }

    comment.text = text || comment.text;
    await comment.save();

    const updatedBlog = await Blog.findById(comment.blog)
      .populate("author", "name email")
      .populate({
        path: "comments",
        populate: { path: "user", select: "name _id" },
        options: { sort: { createdAt: -1 } },
      })
      .populate({
        path: "likes",                          // ✅ fixed
        populate: { path: "user", select: "name email _id" }
      });

    res.json(updatedBlog);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete Comment
const deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;

    const comment = await Comment.findById(commentId);
    if (!comment) return res.status(404).json({ message: "Comment Not Found" });

    const userId = (req.user._id || req.user.id).toString(); // ✅ fixed
    if (req.user.role !== "admin" && comment.user.toString() !== userId) {
      return res.status(403).json({ message: "Not authorized to delete this comment" });
    }

    await comment.deleteOne();

    const updatedBlog = await Blog.findById(comment.blog)
      .populate("author", "name email")
      .populate({
        path: "comments",
        populate: { path: "user", select: "name _id" },
        options: { sort: { createdAt: -1 } },
      })
      .populate({
        path: "likes",                          // ✅ fixed
        populate: { path: "user", select: "name email _id" }
      });

    res.json(updatedBlog);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { addComment, editComment, deleteComment }