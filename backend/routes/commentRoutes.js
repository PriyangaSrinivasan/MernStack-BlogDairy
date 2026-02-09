const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const { addComment, editComment, deleteComment } = require("../controllers/commentController");

// Correct routes
router.post("/:blogId", protect, addComment);
router.put("/:blogId/:commentId", protect, editComment);
router.delete("/:blogId/:commentId", protect, deleteComment);

module.exports = router;
