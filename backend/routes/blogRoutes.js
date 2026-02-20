const express = require("express");
const router = express.Router();
const Blog = require("../models/blogModel");

const upload = require("../middleware/uploadMiddleware");
const { protect } = require("../middleware/authMiddleware");

const {
  getBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
} = require("../controllers/blogController");



// 👉 Get all blogs
router.get("/", getBlogs);

// 👉 Create Blog (protected) - Image optional
router.post("/", protect, upload.single("image"), createBlog);

// 👉 Update Blog (protected) - Image optional
router.put("/:id", protect, upload.single("image"), updateBlog);

// 👉 Delete blog (protected)
router.delete("/:id", protect, deleteBlog);

// 👉 Get blog by ID — ✅ ALWAYS LAST
router.get("/:id", getBlogById);

module.exports = router;
