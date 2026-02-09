const express = require ("express")
const router = express.Router()
const { protect } = require("../middleware/authMiddleware");
const { toggleLike, getLikesForBlog } = require("../controllers/likeController");

router.post("/:blogId",protect,toggleLike)


module.exports =router