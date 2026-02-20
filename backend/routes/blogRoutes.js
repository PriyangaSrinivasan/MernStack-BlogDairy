// const express = require("express");
// const router = express.Router();

// const upload = require("../middleware/uploadMiddleware");
// const { protect } = require("../middleware/authMiddleware");

// const {
//   getBlogs,
//   getBlogById,
//   createBlog,
//   updateBlog,
//   deleteBlog,
// } = require("../controllers/blogController");

// // 👉 Create Blog (protected) - Image optional
// router.post("/", protect, upload.single("image"), createBlog);

// // 👉 Update Blog (protected) - Image optional
// router.put("/:id", protect, upload.single("image"), updateBlog);

// // 👉 Get all blogs
// router.get("/", getBlogs);

// // 👉 Get blog by ID
// router.get("/:id", getBlogById);

// // 👉 Delete blog (protected)
// router.delete("/:id", protect, deleteBlog);

// module.exports = router;

const express = require("express");
const router = express.Router();
const Blog = require("../models/blogModel"); // ✅ add this import

const upload = require("../middleware/uploadMiddleware");
const { protect } = require("../middleware/authMiddleware");

const {
  getBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
} = require("../controllers/blogController");

// ✅ Temporary fix route — must be BEFORE /:id
router.get("/fix-categories", async (req, res) => {
  await Blog.updateMany(
    { category: { $exists: false } },
    { $set: { category: "General" } }
  );
  res.json({ message: "All old blogs fixed!" });
});

// 👉 Create Blog (protected) - Image optional
router.post("/", protect, upload.single("image"), createBlog);

// 👉 Update Blog (protected) - Image optional
router.put("/:id", protect, upload.single("image"), updateBlog);

// 👉 Get all blogs
router.get("/", getBlogs);

// 👉 Get blog by ID
router.get("/:id", getBlogById);

// 👉 Delete blog (protected)
router.delete("/:id", protect, deleteBlog);

module.exports = router;
